import React from 'react'
import { OAuthSignin, actions } from 'react-redux-oauth2'
import { push } from 'react-router-redux'
import { Input, Button } from 'reactstrap'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import classnames from 'classnames'
import _ from 'lodash'
import { toastr } from 'react-redux-toastr'
import { FormattedMessage, injectIntl } from 'react-intl'
import { loading } from '../../components/helper'

const renderField = ({ input, label, type, meta: { touched, error }, ...other }) => (
  <div className={classnames('form-group', { 'has-error': !_.isEmpty(error) })}>
    <label htmlFor>{label}</label>
    <div>
      <input {...input} {...other} type={type} />
      {touched && error && <span className='has-error'>{error}</span>}
    </div>
  </div>
)

export class Signin extends React.Component {
  submit (values) {
    const { dispatch, intl } = this.props
    return dispatch({
      type: 'SIGNIN',
      payload: new Promise((resolve, reject) => {
        dispatch(actions.getToken(values, e => {
          if (e) {
            const err = new SubmissionError({ username: intl.formatMessage({id: 'user_not_exists'}), password: intl.formatMessage({id: 'password_incorrect'}) })
            reject(err)
            toastr.error(intl.formatMessage({id: 'signin_failed'}), intl.formatMessage({id: 'signin_failed_tip'}))
          } else {
            toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_signin'}))
            dispatch(push('/'))
            resolve()
          }
        }))
      })
    })
  }

  render () {
    const { dispatch, intl } = this.props
    const OAuthSigninButton = OAuthSignin(loading(Button))
    const SigninButton = loading(Button)

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
                <p className='text-xs-center'>LOGIN TO CONTINUE</p>
                <form onSubmit={this.props.handleSubmit(this.submit.bind(this))} ref='form'>
                  <Field
                    component={renderField}
                    type='text'
                    className='form-control underlined'
                    name='username'
                    label={<FormattedMessage id='username' />}
                    placeholder='Your email address'
                    />
                  <Field
                    component={renderField}
                    type='password'
                    className='form-control underlined'
                    name='password'
                    label={<FormattedMessage id='password' />}
                    placeholder='Your password'
                    required
                    />
                  <div className='form-group'>
                    <label htmlFor>
                      <Input className='checkbox' type='checkbox' />
                      <span>Remember me</span>
                    </label>
                    <a href='#' className='forgot-btn pull-right' onClick={e => dispatch(push('/'))}>Forgot password?</a>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-sm-8'>
                        <SigninButton block color='primary'
                          loading={this.props.oauth.authenticating}
                          text={<FormattedMessage id='pending_signin' />}
                          type='submit'>
                          Signin
                        </SigninButton>
                      </div>
                      <div className='col-sm-4 text-xs-right'>
                        <OAuthSigninButton
                          block color='primary'
                          loading={this.props.oauth.authenticating}
                          text={<FormattedMessage id='pending_signin' />}
                          provider='github'
                          onSuccess={() => { toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_signin'})); dispatch(push('/')) }}>
                          <i className='fa fa-github' />&nbsp;&nbsp;Github
                          </OAuthSigninButton>
                      </div>
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

export default reduxForm({ form: 'signin' })(
  connect(state => ({ oauth: state.oauth }))(
    injectIntl(Signin)
  ))
