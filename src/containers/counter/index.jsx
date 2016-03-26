import React from 'react';
import {connect} from '../../lib/helper';
import * as actions from '../../actions';
import * as components from '../../components';
import {reduxForm as connectForm} from 'redux-form';

import './style.less';

class CounterApp extends React.Component {
  render(){
    var {children, ...other} = this.props;
    return <div><components.Signup {...other} />{children}</div>
  }
}

export default connectForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'amount',                           // a unique name for this form
  fields: ['amount'] // all the fields in your form
})(connect(state=>({counter: state.counter}), actions.counter)(CounterApp));
