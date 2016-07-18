import React from 'react';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import _ from 'lodash';
import {connect, convert_joi_error} from '../lib/helper';
import * as signup_actions from '../actions/signup';
import {reduxForm, Field, SubmissionError} from 'redux-form';

var {PropTypes} = React;

const fields = Joi.object().keys({
  username: Joi.string().min(3).max(30).required().label('Username'),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required().label('Password')
});

const validate = values => {
  const errors = {}

  console.log(Joi.validate(values, fields));
  return errors
}

const renderField = props => (
  <div>
    <label>{props.placeholder}</label>
    <div>
      <input {...props.input}/>
      {props.touched && props.error && <span>{props.error}</span>}
    </div>
  </div>
)

export class SignupForm extends React.Component {
  submit(values){
    return new Promise((resolve, reject)=>{
      let result = Joi.validate(values, fields);
      if (result.error) {
        console.log(convert_joi_error(result.error.details));
        return reject(new SubmissionError(convert_joi_error(result.error.details)));
      }
      console.log(values);
      resolve(values);
    })
  }
  render() {
    const {form, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div>
          <label>User Name</label>
          <Field name="username" type="text" component={renderField} placeholder="Username"/>
        </div>
        <div>
          <label>Password</label>
          <Field name="password" type="password" component={renderField} placeholder="Password"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signup',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(connect(state=>({form: state.form.signup}), signup_actions)(SignupForm));
