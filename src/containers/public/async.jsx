import React from 'react'
import {connect, action_props} from '../../lib/helper';
import actions from '../../reduxers'
import {asyncConnect} from 'redux-connect'
import Loader from 'react-loader-advanced'

export class Async extends React.Component {
  render(){
    let {async:{loaded, data, error, loading}} = this.props;
    return (
      <div>
          <pre>{error ? error : JSON.stringify(data, null, '  ')}</pre>
          <button onClick={this.props.actions.fetch}>refresh</button>
      </div>
    );
  }
}

export default asyncConnect([{
  promise: ({store:{dispatch}}) => dispatch(actions.async.fetch())
}], state => ({async: state.async}), action_props(actions.async))(Async);
