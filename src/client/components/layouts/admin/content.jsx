import React from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'

export default class Content extends React.Component {
  render(){
    let {children} = this.props;
    return (
      <div>
        <div className="ant-layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <div style={{ height: 590 }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
