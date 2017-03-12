import React from 'react'
import querystring from 'query-string'
import { Form, Button, Input, InputGroup, InputGroupButton } from 'reactstrap'
import { Field } from 'redux-form'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'

export class SearchForm extends React.Component {
  submit (values) {
    console.log(values, this.props.location)
    const { location, dispatch } = this.props
    const search = querystring.parse(location.search)
    dispatch(push({...location, search: querystring.stringify({...search, ...values})}))
  }
  render () {
    const { handleSubmit } = this.props
    return (
      <Form inline onSubmit={handleSubmit(this.submit.bind(this))}>
        <InputGroup>
          <Field name='q' type='text' className='boxed rounded-s' placeholder='search for...' component={({input, meta, ...props}) => (<Input {...input} {...props} />)} />
          <InputGroupButton>
            <Button className='rounded-s' type='submit'>
              <i className='fa fa-search' />
            </Button>
          </InputGroupButton>
        </InputGroup>
      </Form>
    )
  }
}
export default withRouter(SearchForm)
