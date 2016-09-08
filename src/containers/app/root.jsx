import React from 'react'
import { Link } from 'react-router'

export default class Root extends React.Component {
  render(){
    return (
      <div>
        <ul>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/async">Async</Link></li>
          <li><Link to="/auth">Auth</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
