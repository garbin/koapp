import React from 'react'

export class AdminLTE extends React.Component {
  render(){
    return (
      <div>{this.props.children}</div>
    )
  }
}

export class Menu extends React.Component {
  render(){
    return (
      <div>menu{this.props.children}</div>
    )
  }
}
