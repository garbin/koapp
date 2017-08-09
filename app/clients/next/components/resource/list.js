import React from 'react'
import Router from 'next/router'
import { compose } from 'recompose'
import { Field, reset, reduxForm } from 'redux-form'
import { get } from 'lodash'
import { toastr } from 'react-redux-toastr'
import { translate } from 'react-i18next'
import { Base64 } from 'js-base64'
import {
  Card, CardBlock, Row, Col,
  Form, InputGroup, InputGroupButton,
  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import { Input } from '../form'
import Table from '../table'
import Pagination from '../pagination'

export const SearchForm = compose(
  reduxForm({form: 'search'}),
  translate()
)(class extends React.Component {
  handleReset () {
    const { dispatch, onReset = f => f } = this.props
    dispatch(reset('search'))
    onReset()
  }
  render () {
    const { handleSubmit, children, t, initialValues } = this.props
    return (
      <Form inline onSubmit={handleSubmit}>
        {children}
        <InputGroup>
          <Field component={Input}
            type='text'
            inline
            className='boxed rounded-s'
            name='q'
            placeholder='Search for...' />
          <InputGroupButton>
            <Button className='rounded-s' type='submit'>
              <i className='fa fa-search' />
            </Button>
          </InputGroupButton>
        </InputGroup>
        {initialValues.q && (
          <Button color='link'
            title={t('clear_search')}
            type='button'
            onClick={this.handleReset.bind(this)}>
            <i className='fa fa-eraser' />
          </Button>
        )}
      </Form>
    )
  }
})

export default class List extends React.Component {
  get limit () { return 10 }
  get name () { throw new Error('Name is undefined') }
  get columns () { return [] }
  get data () { return get(this.props.data, this.name, []) }
  async componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.url !== this.props.url) {
      const { url: { query }, data: { refetch }, limit } = nextProps
      const { page = 1 } = query
      await refetch({
        keyword: query.q,
        offset: Base64.encode((parseInt(page) - 1) * limit)
      })
    }
  }
  handleSearch (q) {
    const { pathname, query } = this.props.url
    Router.push({
      pathname,
      query: {
        ...query,
        ...q
      }
    })
  }
  handleSearchReset () {
    const { pathname } = this.props.url
    Router.push({ pathname })
  }
  handleDestroy (checklist) {
    const { destroyItem, t, data: { refetch } } = this.props
    const items = Object.entries(checklist).reduce((result, [id, checked]) => {
      checked && result.push(id)
      return result
    }, [])
    Promise.all(items.map(id => {
      return destroyItem({
        variables: { id }
      })
    })).then(v => {
      toastr.success(t('toastr/success/title'), t('toastr/success/message'))
      refetch()
    }).catch(e => {
      toastr.error(t('toastr/error'), e.response)
    })
  }
  handleDestroyConfirm (checklist) {
    const { t } = this.props
    toastr.confirm(t('destroy/confirm'), {
      onOk: e => { this.handleDestroy(checklist) },
      onCancel: e => { console.log('cancel') }
    })
  }
  renderSearchForm (children) {
    const { url: {query: initialValues} } = this.props
    return (
      <SearchForm
        initialValues={initialValues}
        onReset={this.handleSearchReset.bind(this)}
        onSubmit={this.handleSearch.bind(this)}>
        {children}
      </SearchForm>
    )
  }
  renderButtons () {}
  renderTable () {
    return (
      <Table
        className='table-striped'
        columns={this.columns}
        loading={this.data.loading}
        error={this.data.error}
        rows={this.data} />
    )
  }
  renderBatchMenu () {
    const { t, checkedItems } = this.props
    return (
      <DropdownMenu>
        <DropdownItem onClick={this.handleDestroyConfirm.bind(this, checkedItems)}>
          <i className='fa fa-trash-o' />&nbsp;{t('destroy')}
        </DropdownItem>
      </DropdownMenu>
    )
  }
  renderBatchBar () {
    const { t } = this.props
    return (
      <UncontrolledDropdown size='sm'>
        <DropdownToggle caret>
          {t('batch_actions')}
        </DropdownToggle>
        {this.renderBatchMenu()}
      </UncontrolledDropdown>
    )
  }
  handlePageChange ({selected}) {
    const { url } = this.props
    Router.push({
      pathname: url.pathname,
      query: {...url.query, page: selected + 1}
    })
  }
  renderPagination () {
    const { url: {query}, limit } = this.props
    const totalCount = get(this.props.data, `${this.name}.total`, 0)
    const page = parseInt(query.page - 1) || 0
    const pageCount = Math.ceil(totalCount / limit)
    return (
      <Pagination
        containerClassName='pagination float-sm-right'
        initialPage={page}
        pageCount={pageCount}
        onPageChange={this.handlePageChange.bind(this)} />
    )
  }
  render () {
    return (
      <Card className='content-card'>
        <CardBlock>
          <Row className='list-filter'>
            <Col sm={6}>{this.renderSearchForm()}</Col>
            <Col sm={6} className='text-right'>{this.renderButtons()}</Col>
          </Row>
          {this.renderTable()}
          <Row>
            <Col sm={4} xs={12}>
              {this.renderBatchBar()}
            </Col>
            <Col sm={8} xs={12}>
              {this.renderPagination()}
            </Col>
          </Row>
        </CardBlock>
      </Card>
    )
  }
}
