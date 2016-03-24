import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as counterActions from '../actions/counter';

class App extends React.Component {
  render(){
    var {counter, dispatch} = this.props;
    const actions = bindActionCreators(counterActions, dispatch);
    return (<div>
              Counter:{counter}
              <button onClick={actions.increase}>+</button>
              <button onClick={actions.decrease}>-</button>
              <button onClick={actions.remote}>r</button>
            </div>)
  }
}

export default connect((state)=>({counter:state.counter}))(App);
