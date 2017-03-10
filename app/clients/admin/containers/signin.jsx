import React from 'react'
import { OAuthSignin, actions } from 'react-redux-oauth2'
import { Input, Button } from 'reactstrap'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import classnames from 'classnames'
import _ from 'lodash'
import { toastr } from 'react-redux-toastr'
import { loading } from '../components/helper'

const renderField = ({ input, label, type, meta: { touched, error }, ...other }) => (
  <div className={classnames('form-group', { 'has-error': !_.isEmpty(error) })}>
    <label htmlFor>{label}</label>
    <div>
      <input {...input} {...other} type={type} />
      {touched && error && <span className='has-error'>{error}</span>}
    </div>
  </div>
)

export default reduxForm({ form: 'signin' })(connect(state => ({ oauth: state.oauth }))(class Signin extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  submit (values) {
    return this.props.dispatch({
      type: 'SIGNIN',
      payload: new Promise((resolve, reject) => {
        this.props.dispatch(actions.getToken(values, e => {
          if (e) {
            const err = new SubmissionError({ username: '用户不存在', password: '或者密码不正确' })
            reject(err)
            toastr.error('登录失败', '请检查您的用户名和密码')
          } else {
            toastr.success('恭喜', '登录成功')
            this.context.router.replace('/')
            resolve()
          }
        }))
      })
    })
  }
  render () {
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
                    label='User Name'
                    placeholder='Your email address'
                  />
                  <Field
                    component={renderField}
                    type='password'
                    className='form-control underlined'
                    name='password'
                    label='Password'
                    placeholder='Your password'
                    required
                  />
                  <div className='form-group'>
                    <label htmlFor>
                      <Input className='checkbox' type='checkbox' />
                      <span>Remember me</span>
                    </label>
                    <a href='reset.html' className='forgot-btn pull-right'>Forgot password?</a>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-sm-8'>
                        <SigninButton block color='primary'
                          loading={this.props.oauth.authenticating}
                          text='登录中...'
                          type='submit'>
                          Signin
                        </SigninButton>
                      </div>
                      <div className='col-sm-4 text-xs-right'>
                        <OAuthSigninButton
                          block color='primary'
                          loading={this.props.oauth.authenticating}
                          text='登录中...'
                          provider='github'
                          onSuccess={() => { toastr.success('恭喜', '登录成功'); this.context.router.replace('/') }}
                        >
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
}))
