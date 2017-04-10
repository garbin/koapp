import React from 'react'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import { FormattedMessage, injectIntl } from 'react-intl'
import { validate, Input, Button } from '../../components/form'
import { actions as async } from '../../reduxers/async'
import qs from 'query-string'
import { Base64 } from 'js-base64'

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
  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch(async.clear('reset'))
  }
  submit (values) {
    const { dispatch, intl } = this.props
    return dispatch(async.patch('reset')('/auth/user/security', values)).then(res => {
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
      dispatch(push('/session/signin'))
    }).catch(e => {
      toastr.error('error', e)
      throw new SubmissionError({_error: e})
    })
  }

  render () {
    const { dispatch, async } = this.props
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
                    readOnly
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
                      <Button block
                        loading={async.reset && async.reset.status === 'pending'}
                        color='primary'
                        type='submit'>
                        <FormattedMessage id='reset_password' />
                      </Button>
                    </div>
                    <hr />
                    <div className='row'>
                      <Button block onClick={e => dispatch(push('/session/signin'))}>
                        <i className='fa-angle-double-left fa' />
                        &nbsp;&nbsp;
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
  const { location: { search } } = state.router
  const { email, token } = qs.parse(Base64.decode(search.substr(1)) || '')
  return { initialValues: {email, token}, async: state.async }
})(
  reduxForm({ form: 'reset', validate: validate(schema) })(
    injectIntl(withRouter(Reset))))
