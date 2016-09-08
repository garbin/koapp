import React from 'react';
import {connect} from 'react-redux'
import { OAuthSignin, OAuthSignout, actions } from 'redux-oauth2'

class OAuthButton extends React.Component {
  render(){
    return <button {...this.props} />
  }
}

export class AuthApp extends React.Component {
  render(){
    let {oauth} = this.props;
    let Signin  = OAuthSignin(OAuthButton);
    let Signout  = OAuthSignout(OAuthButton);
    return (
      <div>
        <Signin provider="github" onCancel={e => console.log('canceled')} onSuccess={console.log}>
          Signin
        </Signin>
        <Signout>
          Signout
        </Signout>
        <div>{JSON.stringify(oauth.user)}</div>
      </div>
    )
  }
}

export default connect(state => ({oauth:state.oauth}))(AuthApp);
