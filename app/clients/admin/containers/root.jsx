import React from 'react'
import classnames from 'classnames'
import BodyClassname from 'react-body-classname'

export class Root extends React.Component {
  render () {
    if (process.env.__SERVER__) {
      BodyClassname.rewind()
    }

    const { sidebar_open } = this.props

    return (
      <BodyClassname className='loaded'>
        <div className='main-wrapper'>
          <div className={classnames('app header-fixed sidebar-fixed', { 'sidebar-open': sidebar_open })} id='app'>
            <header className='header'>
              <div className='header-block header-block-collapse hidden-lg-up' />
              <div className='header-block header-block-search hidden-sm-down'>
                <form role='search'>
                  <div className='input-container'>
                    <i className='fa fa-search' />
                    <input type='search' placeholder='Search' />
                    <div className='underline' />
                  </div>
                </form>
              </div>
              <div className='header-block header-block-nav'>
                <ul className='nav-profile' />
              </div>
            </header>
            <aside className='sidebar'>
              <div className='sidebar-container'>
                <div className='sidebar-header'>
                  <div className='brand'>
                    <div className='logo' />
                    Ko<strong>app</strong>
                  </div>
                </div>
              </div>
            </aside>
            {this.props.children}
            <footer className='footer' style={{ width: '100%' }}>
              <div className='footer-block author text-xs-right'>
                <ul>
                  <li> created by <a href='https://github.com/garbinh'>Garbin Huang</a> </li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
      </BodyClassname>
    )
  }
}

export default Root
