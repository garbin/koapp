import React from 'react'
import { Well } from 'react-bootstrap'
import {connect, action_props} from '../../lib/helper';
import * as async_actions from '../../actions/async';
import {asyncConnect} from 'redux-connect'
import Loader from 'react-loader-advanced'

export class Async extends React.Component {
  render(){
    let {async:{loaded, data, error, loading}} = this.props;
    return (
      <Well>
        <Loader show={loading} message="loading...">
          <pre>{error ? error : JSON.stringify(data, null, '  ')}</pre>
          <button onClick={this.props.actions.fetch}>refresh</button>
        </Loader>
      </Well>
    );
  }
}

export default asyncConnect([{
  promise: ({store:{dispatch}}) => dispatch(async_actions.fetch())
}], state => ({async: state.async}), action_props(async_actions))(Async);
