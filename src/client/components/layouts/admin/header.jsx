import React from 'react'

export default class Header extends React.Component {
  render(){
    let {children} = this.props;
    return (
      <div className="ant-layout-header">
        <h3>列表</h3>
        {children}
      </div>
    );
  }
}
