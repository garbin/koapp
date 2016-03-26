import React from 'react';
import {connect} from '../../lib/helper';

export default connect(state=>({index:state.index}))(class extends React.Component {
  render(){
    var {index} = this.props;
    return <div>Redux Rocks!{index}</div>
  }
})
