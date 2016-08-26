import React from 'react'
export default class Footer extends React.Component {
  render(){
    let {children} = this.props;
    return (
      <div className="ant-layout-footer">
        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
      </div>
    )
  }
}
