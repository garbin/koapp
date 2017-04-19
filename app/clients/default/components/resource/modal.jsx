import React from 'react'
import { push } from 'react-router-redux'
import { Button, modal, Modal } from '../form'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import pluralize from 'pluralize'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

export class ModalForm extends Modal {
  getConfig () {
    const { config: newest, match } = this.props
    const config = super.getConfig()
    const resources = pluralize(config.resource)
    return {
      ...config,
      resources,
      resourceRoot: `/${resources}`,
      resourceItem: `/${resources}/${match.params.id}`,
      ...newest
    }
  }
  handleSubmit (values) {
    const { dispatch, intl } = this.props
    const config = this.getConfig()
    const { resourceRoot, resourceItem } = config
    const path = config.method === 'patch' ? resourceItem : resourceRoot
    return dispatch(async[config.method](config.resource)(path, values)).then(v => {
      this.handleClose()
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    }).catch(e => {
      toastr.error(e.response.data.message)
    })
  }
  renderButtons () {
    const { async } = this.props
    const config = super.getConfig()
    return (
      <div>
        <Button onClick={this.handleClose.bind(this)} type='button'>
          <FormattedMessage id='close' />
        </Button>
        &nbsp;&nbsp;
        <Button
          color='primary'
          loading={_.get(async, `${config.resource}.status`) === 'pending'}
          type='submit'>
          <FormattedMessage id='submit' />
        </Button>
      </div>
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    const config = this.getConfig()
    const { resourceItem } = config
    config.method === 'patch' && dispatch(async.get(config.resource)(resourceItem))
  }
  componentWillUnmount () {
    const { dispatch } = this.props
    const config = this.getConfig()
    dispatch(async.clear(config.resource)())
  }
  handleClose () {
    const { dispatch } = this.props
    const config = this.getConfig()
    dispatch(push(this.context.location || `/${config.resources}`))
  }
}
export default (config) => {
  const mapStateToProps = config.mapStateToProps || ([state => ({
    async: state.async,
    oauth: state.oauth,
    initialValues: _.get(state.async, `${config.resource}.response`)
  })])
  return (Component = ModalForm) => {
    const name = config.name || config.resource
    return modal({...config, name, mapStateToProps})(Component)
  }
}
