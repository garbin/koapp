import React from 'react'
import { Link } from 'react-router'
import { AppBar } from 'react-toolbox/lib/app_bar'

export default class Root extends React.Component {
  render(){
    return (
      <div>
        <AppBar flat>
          <strong>Koa</strong>pp
        </AppBar>
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
