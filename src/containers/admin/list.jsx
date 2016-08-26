import React from 'react'
import {asyncConnect} from 'redux-connect'
import {connect} from '../../lib/helper'

export class List extends React.Component {
  render(){
    return (
      <div>List</div>
    );
  }
}

export default connect(state => ({user:state.auth.get('user')}))(List);
