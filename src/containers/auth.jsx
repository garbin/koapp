import React from 'react';
import { OAuthSignInButton } from "redux-auth/bootstrap-theme"
import cookie from 'react-cookie'


export default class FormApp extends React.Component {
  render(){
    const next = function () {
      console.log(arguments);
      cookie.save('access_token', '9ee2f8ac2ab7dd1362d97d2298bb6389');
    }
    return (<div>
      <OAuthSignInButton provider="github" next={next} />
      </div>)
  }
}
