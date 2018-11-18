import React from 'react'
import Head from 'next/head'
import LoadingBar from 'react-redux-loading-bar'
import { withProps, compose } from 'recompose'
import { isFunction } from 'lodash'
import { translate } from 'react-i18next'
import '../styles/theme.scss'

export class Page extends React.Component {
  renderChildren () {
    return this.props.children
  }
  render () {
    const { title } = this.props
    return (
      <div>
        <Head>
          <title>{title ? `${title} - ` : ''}Dianpu Powrered</title>
          <link rel='stylesheet' href='/static/css/font-awesome.css' />
          <link rel='stylesheet' href='/static/css/bootstrap.css' />
          <link rel='stylesheet' href='/static/css/theme.css' />
          <link
            href='//diegoddox.github.io/react-redux-toastr/5.0/react-redux-toastr.min.css'
            rel='stylesheet'
            type='text/css'
          />
        </Head>
        <LoadingBar style={{ zIndex: 9999, backgroundColor: '#4bcf99' }} />
        {this.renderChildren()}
      </div>
    )
  }
}

export default function page (pageProps, PageComponent) {
  const withPageProps = isFunction(pageProps) ? pageProps : props => pageProps
  const ConnectedPage = compose(translate(), withProps(withPageProps))(
    PageComponent || Page
  )
  return Component => props => (
    <ConnectedPage {...props}>
      <Component {...props} />
    </ConnectedPage>
  )
}
