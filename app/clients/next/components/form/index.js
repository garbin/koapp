import Joi from 'joi'
import { set } from 'lodash'
import Input from './input'
import Button from './button'
import Checkbox from './checkbox'
import ButtonDropdown from './button_dropdown'

export { Input, Button, Checkbox, ButtonDropdown }

export function validate (schema, options = {abortEarly: false}) {
  return values => {
    const joi = schema.isJoi ? schema : Joi.object().keys(schema).unknown()
    const result = Joi.validate(values, joi, options)
    if (result.error) {
      return result.error.details.reduce((errors, e) => {
        let { type, path, message, context } = e
        if (context) {
          switch (type) {
            case 'object.and':
              path = path === 'value' ? context.missing[0] : `${path}.${context.key}`
              set(errors, path, message)
              break
            case 'object.missing':
              for (let peer of context.peers) set(errors, path === 'value' ? peer : `${path}.${peer}`, message)
              break
            default:
              set(errors, path, message)
              break
          }
        } else {
          set(errors, path, message)
        }
        return errors
      }, {})
    }
    return {}
  }
}
