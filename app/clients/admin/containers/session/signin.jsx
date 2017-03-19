import React from 'react'
import { OAuthSignin, actions } from 'react-redux-oauth2'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Input, Button, Checkbox, validate } from '../../components/form'
import Joi from 'joi'

const schema = {
  username: Joi.string().required(),
  password: Joi.string().required()
}

export class Signin extends React.Component {
  submit (values) {
    const { dispatch, intl } = this.props
    return new Promise((resolve, reject) => {
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
  }

  render () {
    const { dispatch, intl } = this.props
    const OAuthSigninButton = OAuthSignin(Button)

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
                    component={Input}
                    type='text'
                    className='form-control underlined'
                    name='username'
                    label={<FormattedMessage id='username' />}
                    placeholder='Your email address'
                    />
                  <Field
                    component={Input}
                    type='password'
                    className='form-control underlined'
                    name='password'
                    label={<FormattedMessage id='password' />}
                    placeholder='Your password'
                    required
                    />
                  <div className='form-group'>
                    <Checkbox inline label={<FormattedMessage id='remeber_me' />} />
                    <Link to='/session/forget' className='forget-btn pull-right'>
                      <FormattedMessage id='forget_password' />
                    </Link>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <Button block color='primary'
                        loading={this.props.oauth.authenticating}
                        loadingText={<FormattedMessage id='pending_signin' />}
                        type='submit'>
                        <FormattedMessage id='signin' />
                      </Button>
                    </div>
                    <hr />
                    <div className='row'>
                      <OAuthSigninButton block
                        loading={this.props.oauth.authenticating}
                        loadingText={<FormattedMessage id='pending_signin' />}
                        provider='github'
                        onSuccess={() => { toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_signin'})); dispatch(push('/')) }}>
                        <i className='fa fa-github' />&nbsp;&nbsp;Github
                        </OAuthSigninButton>
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

export default reduxForm({ form: 'signin', validate: validate(schema) })(
  connect(state => ({ oauth: state.oauth }))(
    injectIntl(Signin)
  ))
