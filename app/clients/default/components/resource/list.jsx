import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import querystring from 'query-string'
import { push, replace } from 'react-router-redux'
import { withRouter } from 'react-router'
import { reduxForm } from 'redux-form'
import { ButtonDropdown } from '../../components/form'
import { DropdownToggle,
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
import { injectIntl, FormattedMessage } from 'react-intl'
import _ from 'lodash'

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
  getConfig () {
    const { config, checklist, intl } = this.props
    const resources = pluralize(config.resource)
    const batchDeleteClick = e => toastr.confirm(intl.formatMessage({id: 'toastr.dangerous_confirm_message'}), {
      onOk: e => this.handleDestroy(checklist),
      onCancel: e => console.log('cancel')
    })

    return {
      perPage: 10,
      resources,
      resourcePath: `/${resources}`,
      createButton: (
        <Link to={`/${resources}/create`} className='btn btn-primary btn-sm rounded-s'>
          <FormattedMessage id='create' />
        </Link>),
      columns: [],
      batchActions: (
        <DropdownItem onClick={batchDeleteClick}>
          <i className='fa fa-remove icon' /><FormattedMessage id='delete' />
        </DropdownItem>),
      ...config
    }
  }
  fetch (search) {
    const { dispatch, location } = this.props
    const config = this.getConfig()
    const params = querystring.parse(search === undefined ? location.search : search)
    params.sort = '-created_at'
    return dispatch(async.list(config.resources, {perPage: config.perPage})(config.resourcePath, {params})).then(res => {
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
    const { dispatch, intl } = this.props
    const config = this.getConfig()
    const items = Object.entries(checklist).reduce((result, [id, checked]) => {
      checked && result.push(id)
      return result
    }, [])
    Promise.all(items.map(item => {
      return dispatch(async.destroy(config.resource)(`${config.resourcePath}/${item}`))
    })).then(v => {
      toastr.success(intl.formatMessage({id: 'toastr.success_title'}), intl.formatMessage({id: 'toastr.success_message'}))
      this.fetch()
    }).catch(e => {
      toastr.error(intl.formatMessage({id: 'toastr.error_title'}), e.response.data.message)
    })
  }
  gotoEdit (value) {
    const { dispatch } = this.props
    const config = this.getConfig()
    this.currentLocation = this.props.location
    dispatch(push(`${config.resourcePath}/${value}/edit`))
  }
  getColumns () {
    const { dispatch, checklist, intl } = this.props
    const config = this.getConfig()
    return (_.isFunction(config.columns) ? config.columns.call(this) : config.columns).map(col => {
      let { className, headerClassName, cellClassName } = col
      className = className || ''
      headerClassName = headerClassName || className
      cellClassName = cellClassName || className
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
        let primary = col.primary || (value => <Button color='primary' onClick={e => this.gotoEdit(value)} size='sm'><span><i className='fa fa-pencil-square-o' /> <FormattedMessage id='edit' /> </span></Button>)
        let dropdown = col.dropdown || (item => (
          <DropdownMenu>
            <DropdownItem onClick={e => toastr.confirm(intl.formatMessage({id: 'toastr.dangerous_confirm_message'}), {
              onOk: e => this.handleDestroy({[item.id]: true}),
              onCancel: e => console.log('cancel')
            })}><FormattedMessage id='delete' /></DropdownItem>
          </DropdownMenu>
          ))
        headerClassName = headerClassName || 'item-col-header item-col-actions-dropdown item-col-1'
        cellClassName = cellClassName || 'item-col-actions-dropdown item-col-1'
        return column('id', col.label, responsive.actions({
          header: {
            props: { className: headerClassName }
          },
          cell: {
            props: { className: cellClassName },
            actions: { primary: primary.bind(this), dropdown: dropdown.bind(this) } }
        }))
      } else if (col.preset === 'image') {
        headerClassName = headerClassName || 'item-col-header fixed item-col-img md'
        cellClassName = cellClassName || 'fixed item-col-img md'
        return column(col.property, col.label, responsive.image(
          {
            header: { props: { className: headerClassName } },
            cell: { props: { className: cellClassName }, href: col.href }
          }
        ))
      } else if (col.preset === 'link') {
        return column(col.property, col.label, responsive.link({
          header: {props: { className: `item-col-header ${headerClassName}` }},
          cell: {props: { className: cellClassName }, href: col.href}
        }))
      } else if (col.preset === 'text') {
        return column(col.property, col.label, responsive.text(_.merge({
          header: {props: { className: `item-col-header ${headerClassName}` }},
          cell: {props: { className: cellClassName }}
        }, col.props)))
      } else if (col.preset === 'time') {
        headerClassName = headerClassName || 'item-col-date'
        cellClassName = cellClassName || 'item-col-date'
        return column(col.property, col.label, responsive.time(_.merge({
          header: {props: { className: `item-col-header ${headerClassName}` }},
          cell: {props: { className: cellClassName }}
        }, col.props)))
      } else {
        return col
      }
    })
  }
  render () {
    const { async, location } = this.props
    const config = this.getConfig()
    const query = querystring.parse(location.search)
    const page = parseInt(query.page || 1) - 1
    const pageCount = (async[config.resources] && async[config.resources].range) ? Math.ceil(async[config.resources].range.length / config.perPage) : 1

    const ReduxSearchForm = reduxForm({form: `${config.resource}_search`, initialValues: {q: query.q}})(SearchForm)
    const columns = this.getColumns()

    return (
      <article className='content items-list-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'> {config.listTitle}&nbsp;
                  {config.createButton}
                  &nbsp;
                  <ButtonDropdown style={{marginBottom: '5px'}} group>
                    <DropdownToggle className='rounded-s' caret size='sm'><FormattedMessage id='batch_actions' /></DropdownToggle>
                    <DropdownMenu>
                      {config.batchActions}
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
          <Table data={async[config.resources]} columns={columns} components={components} />
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
  const mapStateToProps = config.mapStateToProps || (state => ({
    async: state.async,
    checklist: state.checklist,
    oauth: state.oauth
  }))
  return connect(mapStateToProps)(
    withRouter(injectIntl(props => <List {...props} config={config} />))
  )
}
