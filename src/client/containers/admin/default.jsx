import React from 'react'
import {asyncConnect} from 'redux-connect'
import {connect} from '../../lib/helper'

export class Dashboard extends React.Component {
  render(){
    return (
      <div>Dashboard</div>
    );
  }
}

export default connect(state => ({oauth:state.oauth}))(Dashboard);
