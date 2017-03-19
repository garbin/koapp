import React from 'react'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Button } from 'reactstrap'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import { FormattedMessage, injectIntl } from 'react-intl'
import { validate, Input } from '../../components/form'
import { actions as async } from '../../reduxers/async'
import qs from 'query-string'

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  password_confirm: Joi.string().required().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: 'Please check your password'
      }
    }
  })
}

export class Reset extends React.Component {
  submit (values) {
    const { dispatch, intl } = this.props
    return dispatch(async.patch('reset')('/home/reset_password', values)).then(res => {
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
      dispatch(push('/session/signin'))
    }).catch(e => {
      toastr.error('error', e)
      throw new SubmissionError({_error: e})
    })
  }

  render () {
    const { dispatch } = this.props
    return (
      <div>
        <div className='auth'>
          <div className='auth-container'>
            <div className='card'>
              <header className='auth-header'>
                <h1 className='auth-title'>
                  <div className='logo'>
                    <span className='l l1' />
                    <span className='l l2' />
                    <span className='l l3' />
                    <span className='l l4' />
                    <span className='l l5' />
                  </div>       Koapp
                </h1> </header>
              <div className='auth-content'>
                <p className='text-xs-center'>RESET PASSWORD</p>
                <form onSubmit={this.props.handleSubmit(this.submit.bind(this))} ref='form'>
                  <Field
                    component={Input}
                    type='email'
                    className='form-control underlined'
                    name='email'
                    label={<FormattedMessage id='email' />}
                    placeholder='Your email address' />
                  <Field component={Input} type='hidden' inline name='token' />
                  <Field
                    component={Input}
                    type='password'
                    className='form-control underlined'
                    name='password'
                    label={<FormattedMessage id='password' />}
                    placeholder='Password' />
                  <Field
                    component={Input}
                    type='password'
                    className='form-control underlined'
                    name='password_confirm'
                    label={<FormattedMessage id='password_confirm' />}
                    placeholder='Password confirm' />
                  <div className='form-group'>
                    <div className='row'>
                      <Button block color='primary' type='submit'>
                        <FormattedMessage id='reset_password' />
                      </Button>
                    </div>
                    <hr />
                    <div className='row'>
                      <Button block onClick={e => dispatch(push('/session/signin'))}>
                        <FormattedMessage id='goback_signin' />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='ref' id='ref'>
          <div className='color-primary' />
          <div className='chart'>
            <div className='color-primary' />
            <div className='color-secondary' />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const { email, token } = qs.parse(state.router.location.search || '')
  return { initialValues: {email, token} }
})(
  reduxForm({ form: 'reset', validate: validate(schema) })(
    injectIntl(withRouter(Reset))))
