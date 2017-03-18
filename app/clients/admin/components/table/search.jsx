import React from 'react'
import querystring from 'query-string'
import { Form, Button, InputGroup, InputGroupButton } from 'reactstrap'
import { Input } from '../form'
import { Field } from 'redux-form'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'

export class SearchForm extends React.Component {
  submit (values) {
    const { location, dispatch } = this.props
    const search = querystring.parse(location.search)
    dispatch(push({...location, search: querystring.stringify({...search, ...values})}))
  }
  clearSearch () {
    const { location, dispatch } = this.props
    const search = querystring.parse(location.search)
    delete search.q
    dispatch(push({...location, search: querystring.stringify(search)}))
  }
  render () {
    const { handleSubmit, initialValues, children, intl } = this.props
    return (
      <Form inline onSubmit={handleSubmit(this.submit.bind(this))}>
        {children}
        <InputGroup>
          <Field component={Input}
            inline
            type='text'
            className='boxed rounded-s'
            name='q'
            placeholder='Search for...' />
          <InputGroupButton>
            <Button className='rounded-s' type='submit'>
              <i className='fa fa-search' />
            </Button>
            {initialValues.q && (
              <Button className='rounded-s'
                title={intl.formatMessage({id: 'clear_search'})} 
                type='button'
                onClick={this.clearSearch.bind(this)}>
                <i className='fa fa-eraser' />
              </Button>
            )}
          </InputGroupButton>
        </InputGroup>
      </Form>
    )
  }
}
export default withRouter(injectIntl(SearchForm))
