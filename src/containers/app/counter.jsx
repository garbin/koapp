import React from 'react';
import { Well } from 'react-bootstrap'
import Counter from '../../components/counter'
import config from '../../config'
import {connect} from '../../lib/helper';
import * as counter_actions from '../../actions/counter';

class CounterApp extends React.Component {
  render(){
    return <Well><Counter {...this.props} /></Well>
  }
}

export default connect( state => ( {counter: state.counter} ), counter_actions)(CounterApp);
