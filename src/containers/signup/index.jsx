import React from 'react';
import {connect} from '../../lib/helper';
import * as actions from '../../actions';
import Signup from '../../components/signup';
import {reduxForm as connectForm} from 'redux-form';

class SignupApp extends React.Component {
  render(){
    return <div><Signup {...this.props} /></div>
  }
}

export default connectForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signup',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(connect(state=>({form: state.form.signup}), actions.signup)(SignupApp));
