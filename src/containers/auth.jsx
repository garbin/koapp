import React from 'react';
import { OAuthSignInButton, SignOutButton } from "redux-auth/bootstrap-theme"
import cookie from 'react-cookie'


export default class FormApp extends React.Component {
  render(){
    return (<div>
      <OAuthSignInButton provider="github" />
      <SignOutButton provider="github" />
      </div>)
  }
}
