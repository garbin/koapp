import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from '../../lib/helper';
import * as counterActions from '../../actions/counter';
import Counter from '../../components/counter';

import './style.less';

class CounterApp extends React.Component {
  render(){
    return <div><Counter {...this.props} /></div>
  }
}

export default connect(state=>({counter: state.counter}), counterActions)(CounterApp);
