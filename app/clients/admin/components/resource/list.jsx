import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import querystring from 'query-string'
import { push, replace } from 'react-router-redux'
import { withRouter } from 'react-router'
import { reduxForm } from 'redux-form'
import { ButtonDropdown,
         DropdownToggle,
         Button,
         DropdownMenu,
         DropdownItem } from 'reactstrap'
import Table, { column } from '../table'
import responsive, { components } from '../table/presets/responsive'
import Pagination from '../pagination'
import { toastr } from 'react-redux-toastr'
import { actions as async } from '../../reduxers/async'
import { actions as check } from '../../reduxers/checklist'
import SearchForm from '../table/search'
import pluralize from 'pluralize'

export class List extends React.Component {
  static childContextTypes = {
    list: React.PropTypes.object,
    location: React.PropTypes.object
  }
  getChildContext () {
    return {
      list: this,
      location: this.currentLocation
    }
  }
  fetch (search) {
    const { dispatch, location, config } = this.props
    const params = querystring.parse(search || location.search)
    params.sort = '-created_at'
    return dispatch(async.list(pluralize(config.resource), {perPage: config.perPage})(config.resourcePath || `/${pluralize(config.resource)}`, {params})).then(res => {
      dispatch(check.init(res.action.payload.data))
      return res
    })
  }
  handlePageChange ({ selected }) {
    const { location, dispatch } = this.props
    let search = querystring.parse(location.search)
    search.page = selected + 1
    let newSearch = querystring.stringify(search)
    dispatch(replace({...location, search: newSearch}))
  }
  componentWillMount () {
    this.fetch()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location !== nextProps.location) {
      this.fetch(nextProps.location.search)
    }
  }
  componentWillUnmount () {
    this.props.dispatch(check.clear())
  }
  handleDestroy (checklist) {
    const { dispatch, config } = this.props
    const items = Object.entries(checklist).reduce((result, [id, checked]) => {
      checked && result.push(id)
      return result
    }, [])
    Promise.all(items.map(item => {
      return dispatch(async.destroy(config.resource)(`${config.resourcePath || '/' + pluralize(config.resource)}/${item}`))
    })).then(v => {
      toastr.success('恭喜', '删除成功')
      this.fetch()
    }).catch(e => {
      toastr.error('很遗憾', e.response.data.message)
    })
  }
  gotoEdit (value) {
    const { dispatch, config } = this.props
    this.currentLocation = this.props.location
    dispatch(push(`${config.resourcePath || '/' + pluralize(config.resource)}/${value}/edit`))
  }
  getColumns () {
    const { dispatch, config, checklist } = this.props
    return config.columns.map(col => {
      if (col.preset === 'checkbox') {
        return column('id', 'ID', responsive.checkbox({
          checklist,
          onCheckAll (e) {
            dispatch(check.all(e.target.checked))
          },
          onCheckItem (id, e) {
            dispatch(check.one(id, e.target.checked))
          }
        }))
      } else if (col.preset === 'actions') {
        let primary = col.primary || (value => <Button color='primary' onClick={e => this.gotoEdit(value)} size='sm'><span><i className='fa fa-pencil-square-o' /> 编辑 </span></Button>)
        let dropdown = col.dropdown || (item => (
          <DropdownMenu>
            <DropdownItem onClick={e => toastr.confirm('确定删除吗', {
              onOk: e => this.handleDestroy({[item.id]: true}),
              onCancel: e => console.log('cancel')
            })}>删除</DropdownItem>
          </DropdownMenu>
          ))
        return column('id', col.label, responsive.actions({
          header: {
            props: {
              className: 'item-col-header item-col-actions-dropdown'
            }
          },
          cell: {
            props: {
              className: 'item-col-actions-dropdown'
            },
            actions: { primary: primary.bind(this), dropdown: dropdown.bind(this) } }
        }))
      } else if (col.preset === 'image') {
        return column(col.property, col.label, responsive.image(
          {
            header: {
              props: {
                className: 'item-col-header fixed item-col-img md'
              }
            },
            cell: {
              props: {
                className: 'fixed item-col-img md'
              },
              href: col.href
            }
          }
        ))
      } else if (col.preset === 'link') {
        return column(col.property, col.label, responsive.link({
          header: {
            props: {
              className: 'item-col-header item-col-title'
            }
          },
          cell: {
            props: {
              className: 'fixed pull-left item-col-title'
            },
            href: col.href
          }
        }))
      } else if (col.preset === 'text') {
        return column(col.property, col.label, responsive.text({
          header: {
            props: {
              className: 'item-col-header item-col-author'
            }
          },
          cell: {
            props: {
              className: 'item-col-author'
            }
          }
        }))
      } else {
        return col
      }
    })
  }
  render () {
    const { async, location, config, checklist } = this.props
    const query = querystring.parse(location.search)
    const page = parseInt(query.page || 1) - 1
    const pageCount = (async[config.resource] && async[config.resource].range) ? Math.ceil(async[config.resource].range.length / config.perPage) : 1

    const ReduxSearchForm = reduxForm({form: `${config.resource}_search`, initialValues: {q: query.q}})(SearchForm)
    const columns = this.getColumns()

    return (
      <article className='content items-list-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'> {config.listTitle}&nbsp;
                  {config.createButton || (
                    <Link to={`/${pluralize(config.resource)}/create`} className='btn btn-primary btn-sm rounded-s'> 添加 </Link>
                  )}
                  &nbsp;
                  <ButtonDropdown style={{marginBottom: '5px'}} group toggle={function () {}}>
                    <DropdownToggle className='rounded-s' caret size='sm'>操作</DropdownToggle>
                    <DropdownMenu>
                      {config.batchActions || (
                        <DropdownItem onClick={e => toastr.confirm('确定删除吗', {
                          onOk: e => this.handleDestroy(checklist),
                          onCancel: e => console.log('cancel')
                        })}><i className='fa fa-pencil-square-o icon' />删除</DropdownItem>
                      )}
                    </DropdownMenu>
                  </ButtonDropdown>
                </h3>
                <p className='title-description'> {config.listBrief} </p>
              </div>
            </div>
          </div>
          <div className='items-search'>
            <ReduxSearchForm />
          </div>
        </div>
        <div className='card items'>
          <Table data={async[pluralize(config.resource)]} columns={columns} components={components} />
        </div>
        <nav className='text-xs-right'>
          <Pagination initialPage={page} pageCount={pageCount} onPageChange={this.handlePageChange.bind(this)} />
        </nav>
        {this.props.children}
      </article>
    )
  }
}

export default function (config) {
  const { connectedState, ...others } = config
  const _List = props => (
    <List {...props} config={others} />
  )
  return connect(state => ({
    async: state.async,
    checklist: state.checklist,
    oauth: state.oauth,
    ...connectedState }))(withRouter(_List))
}
