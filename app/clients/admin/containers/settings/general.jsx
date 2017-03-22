import React from 'react'
import { page } from '../../components/form'
import { FormattedMessage } from 'react-intl'
import Joi from 'joi'

export default page({
  name: 'settings/general',
  formTitle: <FormattedMessage id='settings.general' />,
  fields: [
    {name: 'settings.site_title', label: <FormattedMessage id='settings.general.site_title' />},
    {
      name: 'settings.keywords',
      className: 'react-tagsinput',
      label: <FormattedMessage id='settings.general.keywords' />,
      type: 'tags'}
  ],
  validate: { settings: Joi.object({
    site_title: Joi.string().min(3).required(),
    keywords: Joi.array().items(Joi.string())
  }) }
})
