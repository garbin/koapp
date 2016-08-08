import React from 'react';
import Counter from '../components/counter'
import config from '../config'
import {connect} from '../lib/helper';
import * as counter_actions from '../actions/counter';
import './style/style.scss'

class CounterApp extends React.Component {
  render(){
    return <div><Counter {...this.props} /></div>
  }
}

export default connect( state => ( {counter: state.counter} ), counter_actions)(CounterApp);
