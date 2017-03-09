import React from 'react'
import { OAuthSignin, actions } from 'react-redux-oauth2'
import { Input } from 'reactstrap'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { beginTask, endTask } from 'redux-nprogress'
import _ from 'lodash'
import notify from 'react-notification-system-redux'
import { Button } from '@blueprintjs/core'

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
            this.props.dispatch(notify.error({
              title: '登录失败',
              message: '请检查您的用户名和密码'
            }))
          } else {
            this.props.dispatch(notify.success({
              title: 'test',
              message: 'message'
            }))
            this.context.router.replace('/')
            resolve()
          }
        }))
      })
    })
  }
  render () {
    const OAuthSigninButton = OAuthSignin(Button)
    const SigninButton = Button

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
                <form onSubmit={this.props.handleSubmit(this.submit.bind(this))}>
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
                        <SigninButton className='btn btn-block btn-primary'
                          loading={this.props.oauth.authenticating}
                          type='submit'>
                          Signin
                        </SigninButton>
                      </div>
                      <div className='col-sm-4 text-xs-right'>
                        <OAuthSigninButton
                          loading={this.props.oauth.authenticating}
                          className='btn btn-block btn-primary'
                          provider='github'
                          onClick={() => this.props.dispatch(beginTask())}
                          onCancel={() => this.props.dispatch(endTask())}
                          onSuccess={() => { this.context.router.replace('/admin'); this.props.dispatch(endTask()) }}
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
