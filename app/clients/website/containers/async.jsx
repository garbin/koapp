import React from 'react'
import { asyncConnect } from 'redux-connect'
import reduxers from '../reduxers'
import { actionProps } from '../lib/helper'

export class Async extends React.Component {
  render () {
    const { async, asyncActionStatus } = this.props
    return (
      <div>
        <pre>{JSON.stringify(asyncActionStatus, null, '  ')}</pre>
        <pre>{JSON.stringify(async, null, '  ')}</pre>
        <button onClick={this.props.actions.fetch}>refresh</button>
      </div>
    )
  }
}

export default asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(reduxers.actions.async.fetch())
}], state => ({ async: state.async }), actionProps(reduxers.actions.async))(Async)
