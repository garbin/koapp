import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
         FormGroup,
         Label,
         Input,
         Form,
         FormFeedback,
         FormText } from 'reactstrap'

export class ModalEditor extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    list: React.PropTypes.object,
    location: React.PropTypes.object
  }
  close () {
    this.context.router.replace(this.context.location || '/resources')
    this.context.list.fetch()
  }
  render () {
    return (
      <Modal isOpen toggle={this.close.bind(this)}
        modalClassName='in'
        backdropClassName='in'
        backdrop>
        <ModalHeader>编辑</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup color='success'>
              <Label for='exampleEmail'>Input with success</Label>
              <Input state='success' />
              <FormFeedback>Success! You did it!</FormFeedback>
              <FormText color='muted'>Example help text that remains unchanged.</FormText>
            </FormGroup>
            <FormGroup color='warning'>
              <Label for='examplePassword'>Input with warning</Label>
              <Input state='warning' />
              <FormFeedback>Whoops, check your formatting and try again.</FormFeedback>
              <FormText color='muted'>Example help text that remains unchanged.</FormText>
            </FormGroup>
            <FormGroup color='danger'>
              <Label for='examplePassword'>Input with danger</Label>
              <Input state='danger' />
              <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              <FormText color='muted'>Example help text that remains unchanged.</FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.close.bind(this)}>关闭</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
export default connect(state => ({oauth: state.oauth}))(ModalEditor)
