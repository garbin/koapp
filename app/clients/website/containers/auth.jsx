import React from 'react'
import { connect } from 'react-redux'
import { OAuthSignin, OAuthSignout } from 'react-redux-oauth2'
import { loadable } from '../components/hoc'

class OAuthButton extends React.Component {
  render () {
    return <button {...this.props} />
  }
}

export class AuthApp extends React.Component {
  render () {
    let { oauth } = this.props
    let Signin = OAuthSignin(loadable(OAuthButton))
    let Signout = OAuthSignout(OAuthButton)
    return (
      <div>
        <Signin
          loading={oauth.authenticating}
          provider='github'
          onCancel={e => console.log('canceled')}
          onSuccess={console.log}
        >
          Github
        </Signin>
        <Signout>
          Signout
        </Signout>
        <div>{JSON.stringify(oauth.user)}</div>
      </div>
    )
  }
}

export default connect(state => ({ oauth: state.oauth }))(AuthApp)
