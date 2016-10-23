import React from 'react'
import {bindActionCreators} from 'redux';
import {connect as redux_connect} from 'react-redux';
import _ from 'lodash';
import config from '../config'
import axios from 'axios'
import { select } from 'reactabular'
import react_cookie from 'react-cookie'

export const api = axios.create({
  baseURL: config.api,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.request.use(function (config) {
  try {
    let { access_token } = react_cookie.load('redux_oauth2');
    config.headers["Authorization"] = "Bearer " + access_token;
  } catch (e) { }
  return config;
  // Do something before request is sent
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

export const table = {
  column(property, label, options){
    let col = {
      property,
      header:{
        props:{},
        label
      },
      cell:{
        props:{},
      }
    };
    let { checkable, onCheck, sortable, style, ...rest } = options;
    if (checkable) {
      style = Object.assign(style || {}, {
        flex: "0 0 30px",
      });
      col.header.format = name => (
        <label className="item-check" id="select-all-items">
          <input type="checkbox" className="checkbox" onChange={onCheckAll} />
          <span></span>
        </label>
      )
      col.cell.format = value => (
        <label className="item-check">
          <input type="checkbox" checked={_.includes(checked, value)} onChange={onCheck} value={value} className="checkbox" />
          <span></span>
        </label>
      )
    }
    col.cell.props.style = col.header.props.style = style;
    return col;
  },
  list: {
    table: props => (
      <div className="card items">
        <ul className="item-list striped">{props.children}</ul>
      </div>
    ),
    header: {
      wrapper: props => (
        <li className="item item-list-header hidden-sm-down">
          {props.children}
        </li>),
        row: props => {
          let {children, className, ...rest} = props;
          className = className || 'item-row';
          return (
            <div className={className} {...rest}>{children}</div>
          )
        },
        cell: props => {
          let {className, children, ...rest} = props;
          className = className || "item-col item-col-header";
          return (
            <div className={className} {...rest}>
              <span>{children}</span>
            </div>
          );
        }
      },
    body: {
      wrapper: props => (
        <li>
          <ul className="item-list striped">
            <li style={{display:'none'}}></li>
            {props.children}
          </ul>
        </li>
      ),
      row: props => {
        let {children, className, ...rest} = props;
        className = className || "item";
        return (
          <li className={className} {...rest}>
            <div className="item-row">{children}</div>
          </li>
        );
      },
      cell:class extends React.Component{
        render(){
          let {className, children, ...rest} = this.props;
          className = className || "item-col";
          if (children instanceof Date) {
            children = children.toString();
          }
          return (
            <div className={className} {...rest}>{children}</div>
          );
        }
      }
    }
  },

}
