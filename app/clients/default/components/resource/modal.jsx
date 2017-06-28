import React from 'react'
// import { toastr } from 'react-redux-toastr'
import { FormattedMessage } from 'react-intl'
import { Button, modal, Modal } from '../form'

export default class ModalForm extends Modal {
  get mutation () { return { loading: false } }
  handleSubmit (values) {
    // const { dispatch, intl } = this.props
    // const path = config.method === 'patch' ? resourceItem : resourceRoot
    // return dispatch(api[config.method](config.resource)(path, values)).then(v => {
    //   this.handleClose()
    //   toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    // }).catch(e => {
    //   toastr.error(e.response.data.message)
    // })
  }
  renderButtons () {
    return (
      <div>
        <Button onClick={this.handleClose.bind(this)} type='button'>
          <FormattedMessage id='close' />
        </Button>
        &nbsp;&nbsp;
        <Button
          color='primary'
          loading={this.mutation.loading}
          type='submit'>
          <FormattedMessage id='submit' />
        </Button>
      </div>
    )
  }
}

export { modal }
