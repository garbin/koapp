import React from 'react'
import { form } from '../../components/form'
import { FormattedMessage } from 'react-intl'
import Joi from 'joi'

export default form({
  name: 'settings/general',
  formTitle: <FormattedMessage id='settings.general' />,
  fields: [
    {name: 'settings.site_title', label: <FormattedMessage id='settings.general.site_title' />}
  ],
  validate: { settings: Joi.object({
    site_title: Joi.string().min(3).required()
  }) }
})
