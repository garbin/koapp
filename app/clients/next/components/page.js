import React from 'react'
import Head from 'next/head'
import LoadingBar from 'react-redux-loading-bar'
import { withProps, compose } from 'recompose'
import { isFunction } from 'lodash'
import { translate } from 'react-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/united/bootstrap.min.css'
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
          <title>{title ? `${title} - ` : ''}Powrered</title>
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
