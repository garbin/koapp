import React from 'react'

export default class Page extends React.Component {
  render(){
    let {children} = this.props;
    return (
      <div className="ant-layout-aside">
        {children}
      </div>
    );
  }
}
