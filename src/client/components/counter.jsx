import React from 'react'

export default class Counter extends React.Component {
  render () {
    const { counter, actions } = this.props
    return (<div>Counter:{counter}
      <br />
      <button onClick={actions.increase}>+</button>
      <button onClick={actions.decrease}>-</button>
    </div>)
  }
}
