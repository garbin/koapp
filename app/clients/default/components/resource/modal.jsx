import React from 'react'
import { push } from 'react-router-redux'
import { Button, modal, Modal } from '../form'
import { api } from '../../redux/actions'
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
    return dispatch(api[config.method](config.resource)(path, values)).then(v => {
      this.handleClose()
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    }).catch(e => {
      toastr.error(e.response.data.message)
    })
  }
  renderButtons () {
    const { api } = this.props
    const config = super.getConfig()
    return (
      <div>
        <Button onClick={this.handleClose.bind(this)} type='button'>
          <FormattedMessage id='close' />
        </Button>
        &nbsp;&nbsp;
        <Button
          color='primary'
          loading={_.get(api, `${config.resource}.status`) === 'pending'}
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
    config.method === 'patch' && dispatch(api.get(config.resource)(resourceItem))
  }
  componentWillUnmount () {
    const { dispatch } = this.props
    const config = this.getConfig()
    dispatch(api.clear(config.resource)())
  }
  handleClose () {
    const { dispatch } = this.props
    const config = this.getConfig()
    dispatch(push(this.context.location || `/${config.resources}`))
  }
}
export default (config) => {
  const mapStateToProps = config.mapStateToProps || ([state => ({
    api: state.api,
    oauth: state.oauth,
    initialValues: _.get(state.api, `${config.resource}.response`)
  })])
  return (Component = ModalForm) => {
    const name = config.name || config.resource
    return modal({...config, name, mapStateToProps})(Component)
  }
}
