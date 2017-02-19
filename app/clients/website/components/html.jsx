import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import Helmet from 'react-helmet'
import _ from 'lodash'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render () {
    const { assets, component, store } = this.props
    const content = component ? ReactDOM.renderToString(component) : ''
    const head = Helmet.rewind()
    return (
      <html lang='en-US'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]} key={key} media='screen, projection'
              rel='stylesheet' type='text/css' charSet='UTF-8'
            />
          )}
          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0
            ? <style dangerouslySetInnerHTML={{ __html: _.values(assets.assets).map(asset => asset._style).reverse().join(' ') }} />
            : null }
        </head>
        <body>
          <div id='koapp'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ =${JSON.stringify(store.getState())};` }} charSet='UTF-8' />
          <script src={assets.javascript.vendor} charSet='UTF-8' />
          <script src={assets.javascript.app} charSet='UTF-8' />
        </body>
      </html>
    )
  }
}
