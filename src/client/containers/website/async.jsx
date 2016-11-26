import React from 'react';
import { asyncConnect } from 'redux-connect';
import actions from '../../reduxers';
import { actionProps } from '../../lib/helper';

export class Async extends React.Component {
  render() {
    const { async: { data, error } } = this.props;
    return (
      <div>
        <pre>{error || JSON.stringify(data, null, '  ')}</pre>
        <button onClick={this.props.actions.fetch}>refresh</button>
      </div>
    );
  }
}

export default asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.async.fetch()),
}], state => ({ async: state.async }), actionProps(actions.async))(Async);
