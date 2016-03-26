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
