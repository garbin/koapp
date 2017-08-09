import React from 'react'
import { Field } from 'redux-form'
import { Input, Button } from '../form'
import { Row, Col, Card, CardBlock, CardFooter, Form } from 'reactstrap'

export default class extends React.Component {
  async submit (data) {
    console.log(data)
  }
  get mutation () { return {} }
  get fields () { return [] }
  renderFields () {
    return (
      <CardBlock>
        {this.fields.map(field => <Field key={field.name} component={Input} row type='text' {...field} />)}
      </CardBlock>
    )
  }
  renderFooter () {
    const { t } = this.props
    return (
      <CardFooter>
        <Row>
          <Col sm={2} xs={12} />
          <Col sm={10} xs={12}>
            <Button outline
              loading={this.mutation.loading}
              disabled={this.mutation.disabled}
              color='primary'>
              <i className='fa fa-save' />
              &nbsp;{t('submit')}
            </Button>
          </Col>
        </Row>
      </CardFooter>
    )
  }
  render () {
    const { handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Card>
          {this.renderFields()}
          {this.renderFooter()}
        </Card>
      </Form>
    )
  }
}
