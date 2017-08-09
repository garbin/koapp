import React from 'react'
import { toastr } from 'react-redux-toastr'
import { graphql, gql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { mutations } from 'react-apollo-compose'
import { compose } from 'recompose'
import Joi from 'joi'
import { omit } from 'lodash'
import { Page, page } from '../../components/form'
import { withLoading } from '../../components/utils'
import { updateSetting } from '../../graphql/mutations'

export const schema = {
  settings: Joi.object({
    site_title: Joi.string().min(3).required(),
    keywords: Joi.array().items(Joi.string()),
    status: Joi.string()
  })
}

export class GeneralForm extends Page {
  get mutation () { return this.mutations.updateSetting }
  async handleSubmit (values) {
    const { intl, updateSetting } = this.props
    await updateSetting({
      variables: {
        input: omit(values, ['__typename']),
        id: 'general'
      }
    })
    toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
  }
}

export default compose(
  graphql(gql`
    query Setting {
      general: fetch(id: "general", type: SETTING) {
        ... on Setting {
          settings
        }
      }
    }
  `, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: ({ownProps, data}) => ({
      data,
      initialValues: data.general
    })
  }),
  mutations({ updateSetting }),
  withLoading(),
  page({
    name: 'settings/general',
    schema,
    props: {
      title: <FormattedMessage id='settings.general' />,
      fields: [
        {name: 'settings.site_title', label: <FormattedMessage id='settings.general.site_title' />},
        {
          name: 'settings.keywords',
          className: 'react-tagsinput',
          label: <FormattedMessage id='settings.general.keywords' />,
          type: 'tags'},
        {
          name: 'settings.status',
          format: v => v === 'available',
          parse: v => v ? 'available' : 'unavailable',
          label: <FormattedMessage id='settings.general.status' />,
          type: 'toggle'}
      ]
    }
  })
)(GeneralForm)
