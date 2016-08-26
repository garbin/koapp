import React from 'react'

export default class Main extends React.Component {
  render(){
    let {children} = this.props;
    return (
      <div className="ant-layout-main">
        {children}
      </div>
    )
  }
}
