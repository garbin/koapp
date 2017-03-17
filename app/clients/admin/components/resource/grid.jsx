import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import querystring from 'query-string'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { ButtonDropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem } from 'reactstrap'
import { toastr } from 'react-redux-toastr'
import { Checkbox } from '../form'
import Pagination from '../pagination'
import { actions as async } from '../../reduxers/async'
import { actions as check } from '../../reduxers/checklist'
import pluralize from 'pluralize'
import { FormattedMessage, injectIntl } from 'react-intl'
import style from '../../styles'
import Loading from 'react-loading'
import _ from 'lodash'

export class Grid extends React.Component {
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
    const deleteConfirm = (items, e) => toastr.confirm(intl.formatMessage({id: 'toastr.dangerous_confirm_message'}), {
      onOk: e => this.handleDestroy(items),
      onCancel: e => console.log('cancel')
    })

    return {
      perPage: 12,
      perRow: 4,
      resources,
      resourcePath: `/${resources}`,
      deleteConfirm,
      item: item => <div>{JSON.stringify(item)}</div>,
      createButton: e => (
        <Link to={`/${resources}/create`} className='btn btn-primary btn-sm rounded-s'>
          <FormattedMessage id='upload' />
        </Link>),
      batchActions: (
        <DropdownItem onClick={deleteConfirm.bind(this, checklist)}>
          <i className='fa fa-pencil-square-o icon' /><FormattedMessage id='delete' />
        </DropdownItem>),
      ...config
    }
  }
  fetch (search) {
    const { dispatch, location } = this.props
    const config = this.getConfig()
    const params = querystring.parse(search || location.search)
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
    dispatch(push({...location, search: newSearch}))
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
  handleCheckAll (e) {
    const { dispatch } = this.props
    dispatch(check.all(e.target.checked))
  }
  handleItemCheck (item, e) {
    const { dispatch } = this.props
    dispatch(check.one(item.id, e.target.checked))
  }

  render () {
    const { async, location } = this.props
    const config = this.getConfig()
    const query = querystring.parse(location.search)
    const page = parseInt(query.page || 1) - 1
    const pageCount = (async[config.resources] && async[config.resources].range) ? Math.ceil(async[config.resources].range.length / config.perPage) : 1
    const status = _.get(async, `${config.resources}.status`, 'pending')
    const response = _.get(async, `${config.resources}.response`, [])
    const body = config.body || (e => e)

    return (
      <article className='content cards-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'> {config.listTitle}&nbsp;
                  {config.createButton.call(this)}
                  &nbsp;
                  <ButtonDropdown style={{marginBottom: '5px'}} group toggle={function () {}}>
                    <DropdownToggle className='rounded-s' caret size='sm'>
                      <FormattedMessage id='list_actions' />
                    </DropdownToggle>
                    <DropdownMenu>
                      {config.batchActions}
                    </DropdownMenu>
                  </ButtonDropdown>
                </h3>
                <p className='title-description'> {config.listBrief} </p>
              </div>
            </div>
          </div>
          <div className='items-search' />
        </div>
        <section className='section'>
          {status === 'pending' && (
            <div className='row'>
              <div className='col-sm-12'>
                <div style={{marginLeft: 'auto', marginRight: 'auto', width: '64px', height: '64px'}}>
                  <Loading delay={0} type='cylon' color={style.primaryColor} />
                </div>
              </div>
            </div>
          )}
          {status === 'rejected' && (
            <div className='row'>
              <div className='col-sm-12 text-sm-center'>
                {async[config.resources].response}
              </div>
            </div>
          )}
          {status === 'fulfilled' && body.call(this, _.chunk(response, config.perRow).map((row, rid) => (
            <div className='row' key={`row-${rid}`}>
              {row.map((item, cid) => (
                <div className='col-sm-3' key={`col-${row}-${cid}`}>
                  {config.item.call(this, item, cid)}
                </div>
              ))}
            </div>
          )))}
        </section>
        <div className='row'>
          <div className='col-sm-4'>
            <Checkbox label={<FormattedMessage id='check_all' />} onChange={this.handleCheckAll.bind(this)} />
          </div>
          <div className='col-sm-8'>
            <nav className='text-sm-right'>
              <Pagination initialPage={page} pageCount={pageCount} onPageChange={this.handlePageChange.bind(this)} />
            </nav>
          </div>
        </div>
        {this.props.children}
      </article>
    )
  }
}

export default function (config) {
  const { connectedState, ...others } = config
  const _Grid = props => (
    <Grid {...props} config={others} />
  )
  return connect(state => ({
    async: state.async,
    checklist: state.checklist,
    oauth: state.oauth,
    ...connectedState }))(injectIntl(withRouter(_Grid)))
}
