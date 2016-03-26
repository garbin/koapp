import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../lib/helper';
import * as signupActions from '../../actions/signup';
import SignupForm from '../../components/signup_form';
import {reduxForm as connectForm} from 'redux-form';

class SignupApp extends React.Component {
  render(){
    return <div><SignupForm {...this.props} /></div>
  }
}

export default connectForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signup',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(connect(state=>({form: state.form.signup}), signupActions)(SignupApp));
