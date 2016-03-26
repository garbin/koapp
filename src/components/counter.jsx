import React from 'react';

export default class extends React.Component {
  render(){
    var {counter, fields:{amount}, handleSubmit, actions, dispatch} = this.props;
    return (<div>
              Counter:{counter}
              <br />
              <button onClick={actions.increase}>+</button>
              <button onClick={actions.decrease}>-</button>
              <button onClick={actions.remote}>r</button>
            </div>)
  }
}
