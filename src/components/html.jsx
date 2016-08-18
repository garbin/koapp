import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const {styles:{app,vendor,...other}} = assets;

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          <link href={vendor} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />
          <link href={app} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />
          {Object.keys(other).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
        </head>
        <body>
          <div id="koapp">
            <div dangerouslySetInnerHTML={{__html: content}} />
          </div>
          <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ =${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.vendor} charSet="UTF-8"/>
          <script src={assets.javascript.app} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
