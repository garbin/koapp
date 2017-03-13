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
import Table, { column } from '../../components/table'
import responsive, { components } from '../../components/table/presets/responsive'
import Pagination from '../../components/pagination'
import { toastr } from 'react-redux-toastr'
import { actions as async } from '../../reduxers/async'
import { actions as check } from '../../reduxers/checklist'
import SearchForm from '../../components/table/search'

const perPage = 10

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
    const { dispatch, location } = this.props
    const params = querystring.parse(search || location.search)
    params.sort = '-created_at'
    return dispatch(async.list('users', {perPage})('/users', {params})).then(res => dispatch(check.init(res.action.payload.data)))
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
  handleDestroy (item) {
    console.log(item)
    const { dispatch } = this.props
    dispatch(async.destroy('user')(`/users/${item.id}`)).then(v => {
      toastr.success('恭喜', '删除成功')
      this.fetch()
    })
  }
  gotoEdit (value) {
    const { dispatch } = this.props
    this.currentLocation = this.props.location
    dispatch(push(`/users/${value}/edit`))
  }
  render () {
    const { checklist, async, dispatch, location } = this.props
    const query = querystring.parse(location.search)
    const page = parseInt(query.page || 1) - 1
    const pageCount = (async.users && async.users.range) ? Math.ceil(async.users.range.length / perPage) : perPage

    const ReduxSearchForm = reduxForm({form: 'search', initialValues: {q: query.q}})(SearchForm)

    const columns = [
      column('id', 'ID', responsive.checkbox({
        checklist,
        onCheckAll (e) {
          dispatch(check.all(e.target.checked))
        },
        onCheckItem (id, e) {
          dispatch(check.one(id, e.target.checked))
        }
      })),
      column('avatar', '头像', responsive.image(
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
            href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link>
          }
        }
      )),
      column('username', '用户名', responsive.link({
        header: {
          props: {
            className: 'item-col-header item-col-title'
          }
        },
        cell: {
          props: {
            className: 'fixed pull-left item-col-title'
          },
          href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link>
        }
      })),
      column('email', 'Email', responsive.text({
        header: {
          props: {
            className: 'item-col-header item-col-author'
          }
        },
        cell: {
          props: {
            className: 'item-col-author'
          },
          formatters: [
            value => (<div className='no-overflow'> {value} </div>)
          ]
        }
      })),
      column('created_at', '注册时间', responsive.text({
        header: {
          props: {
            className: 'item-col-header item-col-date'
          }
        },
        cell: {
          props: {
            className: 'item-col-date'
          },
          formatters: [ value => (<div className='no-overflow'> {value} </div>) ]
        }
      })),
      column('id', 'Action', responsive.actions({
        header: {
          props: {
            className: 'item-col-header item-col-actions-dropdown'
          }
        },
        cell: {
          props: {
            className: 'item-col-actions-dropdown'
          },
          actions: {
            primary: value => <Button color='primary' onClick={e => this.gotoEdit(value)} size='sm'><span><i className='fa fa-pencil-square-o' /> 编辑 </span></Button>,
            dropdown: item => (
              <DropdownMenu>
                <DropdownItem onClick={e => toastr.confirm('确定删除吗', {
                  onOk: e => this.handleDestroy(item),
                  onCancel: e => console.log('cancel')
                })}>删除</DropdownItem>
              </DropdownMenu>
            )
          }
        }
      }))
    ]
    return (
      <article className='content items-list-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'> 用户列表&nbsp;<Link to='/users/create' className='btn btn-primary btn-sm rounded-s'> 添加 </Link>
                  &nbsp;
                  <ButtonDropdown style={{marginBottom: '5px'}} group toggle={function () {}}>
                    <DropdownToggle className='rounded-s' caret size='sm'>操作</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag='a'><i className='fa fa-pencil-square-o icon' /> 编辑 </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </h3>
                <p className='title-description'> 用户管理 </p>
              </div>
            </div>
          </div>
          <div className='items-search'>
            <ReduxSearchForm />
          </div>
        </div>
        <div className='card items'>
          <Table data={async.users} columns={columns} components={components} />
        </div>
        <nav className='text-xs-right'>
          <Pagination initialPage={page} pageCount={pageCount} onPageChange={this.handlePageChange.bind(this)} />
        </nav>
        {this.props.children}
      </article>
    )
  }
}

export default connect(state => ({
  async: state.async,
  checklist: state.checklist,
  items: state.items,
  oauth: state.oauth }))(withRouter(List))
