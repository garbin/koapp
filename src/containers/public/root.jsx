import React from 'react'
import { Link } from 'react-router'
import { AppBar } from 'react-toolbox/lib/app_bar'
import styles from './themes/style.scss'
import { Tabs, Tab, FontIcon, Layout, NavDrawer, Checkbox, Panel, Sidebar, IconButton } from 'react-toolbox'


export default class Root extends React.Component {
  render(){
    let drawerActive = false;
    let drawerPinned = false;
    let sidebarPinned = false;
    let toggleDrawerActive = e => {};
    let toggleSidebar = e => {};
    let toggleDrawerPinned = e => {};
    return (
      <Layout>
        <NavDrawer active={drawerActive}
          pinned={drawerPinned} permanentAt='xxxl'
          onOverlayClick={ toggleDrawerActive }>
          <p>
            Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <AppBar flat leftIcon={<FontIcon>star</FontIcon>} theme={{appBar:styles.appBar}}>
            <IconButton icon='menu' inverse={ true } onClick={ toggleDrawerActive }/>
          </AppBar>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
            <Checkbox label='Pin drawer' checked={drawerPinned} onChange={toggleDrawerPinned} />
            <Checkbox label='Show sidebar' checked={sidebarPinned} onChange={toggleSidebar} />
          </div>
        </Panel>
        <Sidebar pinned={ sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}


      // <div>
      //   <AppBar flat theme={{appBar:styles.appBar}}>
      //     <strong>Koa</strong>pp
      //   </AppBar>
      //   <div>
      //     <Tabs index={1}>
      //       <Tab label='Primary'><small>Primary content</small></Tab>
      //       <Tab label='Secondary'><small>Secondary content</small></Tab>
      //       <Tab label='Third' disabled><small>Disabled content</small></Tab>
      //       <Tab label='Fourth' hidden><small>Fourth content hidden</small></Tab>
      //       <Tab label='Fifth'><small>Fifth content</small></Tab>
      //     </Tabs>
      //   </div>
      //   <ul>
      //     <li><Link to="/counter">Counter</Link></li>
      //     <li><Link to="/async">Async</Link></li>
      //     <li><Link to="/auth">Auth</Link></li>
      //     <li><Link to="/admin">Admin</Link></li>
      //   </ul>
      //   <div>{this.props.children}</div>
      // </div>
