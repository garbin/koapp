import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import { FormGroup, Label } from 'reactstrap'
import { Input as ReduxInput, Checkbox } from '../../components/form'

export default props => {
  return (
    <fieldset className='form-group'>
      <legend><FormattedMessage id='permission' /></legend>
      <Field component={ReduxInput} type='number' name='permissions.num' label='额度' />
      <FormGroup>
        <Label>后台管理功能</Label>
        <div>
          <Field component={Checkbox} name='permissions.features.admin.dashboard' label='控制台' inline />
          <Field component={Checkbox} name='permissions.features.admin.auth' label='登录' inline />
          <Field component={Checkbox} name='permissions.features.admin.roles' label='用户管理' inline />
          <Field component={Checkbox} name='permissions.features.admin.users' label='角色管理' inline />
        </div>
      </FormGroup>
    </fieldset>
  )
}
