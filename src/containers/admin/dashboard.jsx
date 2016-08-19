import React from 'react'
import {asyncConnect} from 'redux-connect'
import {connect} from '../../lib/helper'
// import {AdminLTE, Menu, Workspace, Breadcrum, Footer} from '../../components/adminlte'
// import {Table} from 'ant'
export class Dashboard extends React.Component {
  render(){
    let {user} = this.props;
    return (
      <div>User:{JSON.stringify(user.toJS())}</div>
    );
  }
}

export default connect(state => ({user:state.auth.get('user')}))(Dashboard);
