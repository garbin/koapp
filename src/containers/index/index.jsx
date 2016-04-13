import React from 'react';
import {connect} from '../../lib/helper';

export default class extends React.Component {
  render(){
    var {index} = this.props;
    return (<div>
              React Redux Rocks! {index}
              <br />
              <a href="/counter">Counter</a>&nbsp;|&nbsp;
              <a href="/signup">Signup</a>
            </div>)
  }
};
