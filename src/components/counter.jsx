import React from 'react';

export default class extends React.Component {
  render(){
    var {counter, actions, dispatch} = this.props;
    return (<div>
              Counter:{counter}
              <button onClick={actions.increase}>+</button>
              <button onClick={actions.decrease}>-</button>
              <button onClick={actions.remote}>r</button>
            </div>)
  }
}
