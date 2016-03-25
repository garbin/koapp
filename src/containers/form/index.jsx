import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../lib/helper';
import * as formActions from '../../actions/form';
import FormComponent from '../../components/form';
import {reduxForm as connectForm} from 'redux-form';

class FormApp extends React.Component {
  render(){
    return <div><FormComponent {...this.props} /></div>
  }
}

export default connectForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signup',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(connect(state=>({signup: state.form.signup}), formActions)(FormApp));
