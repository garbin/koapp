import React from 'react';
import {connect} from '../lib/helper';
import * as counter_actions from '../actions/counter';

export class Counter extends React.Component {
  render(){
    var {counter, handleSubmit, actions, dispatch} = this.props;
    return (<div>
              Counter:{counter}
              <br />
              <button onClick={actions.increase}>+</button>
              <button onClick={actions.decrease}>-</button>
            </div>)
  }
}

export default connect( state => ( {counter: state.counter} ), counter_actions)(Counter);
