import {bindActionCreators} from 'redux';
import {connect as redux_connect} from 'react-redux';
import _ from 'lodash';

export function connect(mapState, actions) {
  var mapActions = (dispatch)=>{
    if (actions) {
      return {actions: bindActionCreators(actions, dispatch)}
    } else {
      return {actions};
    }
  }
  return redux_connect(mapState, mapActions);
}

export function convert_joi_error(joi_errors) {
  let errors = {};
  _(joi_errors).forEach(error => {
    errors[error.path] = error.message;
  });

  return errors;
}
