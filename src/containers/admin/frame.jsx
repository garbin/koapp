import React from 'react'
import {asyncConnect} from 'redux-connect'
import {connect} from '../../lib/helper'
import {Page, Header, Main, Menu, Content, Footer} from '../../components/layouts/admin'

export class Frame extends React.Component {
  render(){
    let {user, children} = this.props;
    let menu = [
      {
        icon: 'fa fa-dashboard',
        label: 'Dashboard',
        key: 'dashboard',
        href: '/admin'
      },
      {
        icon:'fa fa-list-ul',
        label: 'Resource',
        key: 'resources',
        submenu:[
          {
            icon: 'fa fa-list-ul',
            label: '列表',
            key: 'resource-list',
            href: '/admin/list',
          },
          {
            icon: 'fa fa-wpforms',
            label: '表单',
            key: 'resource-form',
            href: '/form',
          },
        ]}
      ];
    return (
      <Page>
        <Menu menu={menu} />
        <Main>
          <Header user={user}></Header>
          <Content>
            {children}
          </Content>
          <Footer></Footer>
        </Main>
      </Page>
    );
  }
}

export default connect(state => ({user:state.auth.get('user')}))(Frame);
