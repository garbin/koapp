import React from 'react'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import { Link } from 'react-router'
import classnames from 'classnames'
import _ from 'lodash'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const render = {
  item(m){
    return (
      <Menu.Item key={m.key}><Link to={m.href}><i className={classnames(m.icon)}></i>{m.label}</Link></Menu.Item>
    );
  },
  submenu(m){
    return (
      <SubMenu key={m.key} title={<span><i className={classnames(m.icon)} />{m.label}</span>}>
        {m.submenu.map( sm =>render.item(sm))}
      </SubMenu>
    );
  },
};
export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  render(){
    let {children, menu} = this.props;
    let selected, opened;
    menu.forEach(m => {
      if (m.submenu) {
        m.submenu.forEach(sm => {
          if (this.context.router.isActive(sm.href, true)) {
            opened = m.key;
            selected = sm.key;
          }
        })
      } else {
        if (this.context.router.isActive(m.href, true)) {
          selected = m.key;
        }
      }
    });

    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo"><b>Koa</b>pp</div>
        <Menu mode="inline" theme="dark" defaultOpenKeys={[opened]} defaultSelectedKeys={[selected]}>
          {menu.map(m => render[m.submenu ? 'submenu' : 'item'](m))}
        </Menu>
      </aside>
    );
  }
}
