import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import querystring from 'query-string'
import { replace } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import { Base64 } from 'js-base64'
import { ButtonDropdown } from '../../components/form'
import { DropdownToggle,
         Button,
         DropdownMenu,
         DropdownItem } from 'reactstrap'
import Table, { column } from '../table'
import responsive, { components } from '../table/presets/responsive'
import Pagination from '../pagination'
import { toastr } from 'react-redux-toastr'
import { checklist } from '../../redux/actions'
import SearchForm from '../table/search'
import { FormattedMessage } from 'react-intl'
import { get, merge } from 'lodash'

export default class List extends React.Component {
  static get propTypes () {
    return {
      limit: PropTypes.number.isRequired
    }
  }
  static get defaultProps () {
    return {
      limit: 1
    }
  }
  get name () { throw new Error('Name is undefined') }
  get columns () { return [] }
  get data () {
    const { loading, error } = this.props.data
    const {total = 0, edges = []} = get(this.props.data, this.name, {})
    return {
      loading,
      error,
      rows: edges.map(edge => edge.node),
      total
    }
  }
  get title () { return '' }
  get description () { return '' }
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
  async componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.location !== this.props.location) {
      const { location, data: {refetch}, limit } = nextProps
      const query = querystring.parse(location.search)
      const { page = 1 } = query
      await refetch({
        keyword: query.q,
        offset: Base64.encode((parseInt(page) - 1) * limit)
      })
    }
  }
  handlePageChange ({ selected }) {
    const { location, dispatch } = this.props
    let search = querystring.parse(location.search)
    search.page = selected + 1
    let newSearch = querystring.stringify(search)
    dispatch(replace({...location, search: newSearch}))
  }
  handleDestroy (checklist) {
    // const { dispatch, intl } = this.props
    // // const config = this.getConfig()
    // const items = Object.entries(checklist).reduce((result, [id, checked]) => {
    //   checked && result.push(id)
    //   return result
    // }, [])
    // Promise.all(items.map(item => {
    //   return dispatch(api.destroy(config.resource)(`${config.resourcePath}/${item}`))
    // })).then(v => {
    //   toastr.success(intl.formatMessage({id: 'toastr.success_title'}), intl.formatMessage({id: 'toastr.success_message'}))
    //   this.fetch()
    // }).catch(e => {
    //   toastr.error(intl.formatMessage({id: 'toastr.error_title'}), e.response.data.message)
    // })
  }
  gotoEdit (value) {
    // const { dispatch } = this.props
    // const config = this.getConfig()
    // this.currentLocation = this.props.location
    // dispatch(push(`${config.resourcePath}/${value}/edit`))
  }
  getColumns (columns) {
    const { checkedItems, toggleAll, checkItem, intl } = this.props
    return columns.map(col => {
      let { className, headerClassName, cellClassName } = col
      className = className || ''
      headerClassName = headerClassName || className
      cellClassName = cellClassName || className
      if (col.preset === 'checkbox') {
        return column('id', 'ID', responsive.checkbox({
          checklist: checkedItems,
          onCheckAll (e) {
            toggleAll(e.target.checked)
          },
          onCheckItem (id, e) {
            checkItem(id, e.target.checked)
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
        return column(col.property, col.label, responsive.text(merge({
          header: {props: { className: `item-col-header ${headerClassName}` }},
          cell: {props: { className: cellClassName }}
        }, col.props)))
      } else if (col.preset === 'time') {
        headerClassName = headerClassName || 'item-col-date'
        cellClassName = cellClassName || 'item-col-date'
        return column(col.property, col.label, responsive.time(merge({
          header: {props: { className: `item-col-header ${headerClassName}` }},
          cell: {props: { className: cellClassName }}
        }, col.props)))
      } else {
        return col
      }
    })
  }
  renderTable () {
    return (
      <Table
        loading={this.data.loading}
        error={this.data.error}
        rows={this.data.rows}
        columns={this.getColumns(this.columns)}
        components={components} />
    )
  }
  renderButtons () {
    return (
      <span>
        <Link to={`/`} className='btn btn-primary btn-sm rounded-s'>
          <FormattedMessage id='create' />
        </Link>
      </span>
    )
  }
  renderPagination () {
    const { location, limit } = this.props
    const query = querystring.parse(location.search)
    const page = parseInt(query.page - 1) || 0
    const pageCount = Math.ceil(this.data.total / limit)
    return (
      <nav className='text-xs-right'>
        <Pagination initialPage={page} pageCount={pageCount} onPageChange={this.handlePageChange.bind(this)} />
      </nav>
    )
  }
  renderSearchForm () {
    const { location } = this.props
    // const config = this.getConfig()
    const query = querystring.parse(location.search)
    const ReduxSearchForm = reduxForm({form: `searchForm`, initialValues: {q: query.q}})(SearchForm)
    return (<ReduxSearchForm />)
  }
  renderBatchMenuItems () {
    const { intl } = this.props
    const batchDeleteClick = e => toastr.confirm(intl.formatMessage({id: 'toastr.dangerous_confirm_message'}), {
      onOk: e => this.handleDestroy(checklist),
      onCancel: e => console.log('cancel')
    })
    return (
      <DropdownItem onClick={batchDeleteClick}>
        <i className='fa fa-remove icon' /><FormattedMessage id='delete' />
      </DropdownItem>
    )
  }
  renderBatchMenu () {
    return (
      <ButtonDropdown style={{marginBottom: '5px'}} group>
        <DropdownToggle className='rounded-s' caret size='sm'><FormattedMessage id='batch_actions' /></DropdownToggle>
        <DropdownMenu>
          {this.renderBatchMenuItems()}
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
  renderHead () {
    return (
      <div className='title-search-block'>
        <div className='title-block'>
          <div className='row'>
            <div className='col-md-6'>
              <h3 className='title'>
                {this.title}&nbsp;
                {this.renderButtons()}
                &nbsp;
                {this.renderBatchMenu()}
              </h3>
              <p className='title-description'> {this.description} </p>
            </div>
          </div>
        </div>
        <div className='items-search'>
          {this.renderSearchForm()}
        </div>
      </div>
    )
  }
  render () {
    return (
      <article className='content items-list-page'>
        {this.renderHead()}
        <div className='card items'>
          {this.renderTable()}
        </div>
        {this.renderPagination()}
        {this.props.children}
      </article>
    )
  }
}
