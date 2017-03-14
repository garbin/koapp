import Joi from 'joi'
import modal from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'

const schema = {
  username: Joi.string().required(),
  email: Joi.string().email().required()
}

export default modal({
  resource: 'user',
  formTitle: '编辑用户',
  method: 'patch',
  fields: [
    {name: 'username', label: '用户名', type: 'text'},
    {name: 'email', label: 'Email', type: 'text'}
  ],
  submit (values) {
    const { dispatch, match } = this.props
    const { username, email } = values
    return new Promise((resolve, reject) => {
      dispatch(async.patch('user')(`/users/${match.params.id}`, {username, email})).then(v => {
        this.close()
        toastr.success('恭喜', '编辑成功!')
        return v
      }).then(resolve).catch(reject)
    })
  },
  validate: schema
})
