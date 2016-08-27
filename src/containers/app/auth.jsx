import React from 'react';
import { Well } from 'react-bootstrap'
import { OAuthSignInButton, SignOutButton } from "redux-auth/bootstrap-theme"

export default class FormApp extends React.Component {
  render(){
    return (
      <Well>
        <OAuthSignInButton provider="github">
          Github
        </OAuthSignInButton>
        <OAuthSignInButton provider="oauth2">
          OAuth2
        </OAuthSignInButton>
        <SignOutButton provider="github" />
      </Well>
    )
  }
}
