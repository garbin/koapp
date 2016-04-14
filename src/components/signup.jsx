import React from 'react';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import _ from 'lodash';
import {connect} from '../lib/helper';
import * as signup_actions from '../actions/signup';
import {reduxForm} from 'redux-form';
import Form from './form';

var {PropTypes} = React;

export class SignupForm extends Form {
  validatorTypes = {
    username: Joi.string().alphanum().min(3).max(30).required().label('Username'),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).label('Password')
  }
  render() {
    const {form, fields: {username, password}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <div>
          <label>User Name</label>
          <input type="text" placeholder="UserName" {...username}/>
          {this.props.isValid('username')?'':<span style={{color:'red'}}>Invalid {this.props.getValidationMessages('username')}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signup',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(connect(state=>({form: state.form.signup}), signup_actions)(validation(strategy)(SignupForm)));
