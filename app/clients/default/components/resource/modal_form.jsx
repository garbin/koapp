import { push } from 'react-router-redux'
import { Button, modal, Modal } from '../form'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import pluralize from 'pluralize'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

export class ModalForm extends Modal {
  getConfig () {
    const { async: asyncState, match, config: newest } = this.props
    const config = super.getConfig()
    const resources = pluralize(config.resource)
    return {
      ...config,
      resources,
      resourcePath: `/${resources}/${match.params.id}`,
      submit: function (values) {
        const { dispatch, config, match, intl } = this.props
        const resourcePath = config.resourcePath || `/${pluralize(config.resource)}`
        const path = config.method === 'patch' ? `${resourcePath}/${match.params.id}` : resourcePath
        return dispatch(async[config.method](config.resource)(path, values)).then(v => {
          this.close()
          toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
        }).catch(e => {
          toastr.error(e.response.data.message)
        })
      },
      buttons: (
        <div>
          <Button onClick={this.close.bind(this)} type='button'><FormattedMessage id='close' /></Button>
          &nbsp;&nbsp;
          <Button
            color='primary'
            loading={_.get(asyncState, `${config.resource}.status`) === 'pending'}
            type='submit'>
            <FormattedMessage id='submit' />
          </Button>
        </div>
      ),
      ...newest
    }
  }
  componentWillMount () {
    const { dispatch } = this.props
    const config = this.getConfig()
    config.method === 'patch' && dispatch(async.get(config.resource)(config.resourcePath))
  }
  componentWillUnmount () {
    const { dispatch } = this.props
    const config = this.getConfig()
    dispatch(async.clear(config.resource)())
  }
  close () {
    const { dispatch } = this.props
    const config = this.getConfig()
    dispatch(push(this.context.location || `/${config.resources}`))
  }
}
export default (config, Component = ModalForm) => {
  const mapStateToProps = config.mapStateToProps || ([state => ({
    async: state.async,
    oauth: state.oauth,
    initialValues: _.get(state.async, `${config.resource}.response`)
  })])
  const name = config.name || config.resource
  return modal({...config, name, mapStateToProps}, Component)
}
