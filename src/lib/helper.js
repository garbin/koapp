import {bindActionCreators} from 'redux';
import {connect as redux_connect} from 'react-redux';
import _ from 'lodash';
import config from '../config'
import axios from 'axios'

export const api = axios.create({
  baseURL: config.api,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.request.use(function (config) {
	// Do something before request is sent
	config.headers["Authorization"] = "Bearer " + localStorage.access_token;
 	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

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

export function action_props(actions) {
  return dispatch => ({actions:bindActionCreators(actions, dispatch)});
}

export function convert_joi_error(joi_errors) {
  let errors = {};
  _(joi_errors).forEach(error => {
    errors[error.path] = error.message;
  });

  return errors;
}

export function async_state(payload = null, result = undefined, loading = false) {
  return {
    loading,
    loaded: result !== undefined ? true : false,
    data: result ? payload : null,
    error: result ? null : payload
  }
}
