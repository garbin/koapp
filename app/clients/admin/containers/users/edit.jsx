import Joi from 'joi'
import modal from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'

const schema = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  old_password: Joi.string().alphanum(),
  new_password: Joi.string().alphanum(),
  password_confirm: Joi.string().alphanum().valid(Joi.ref('new_password')).options({
    language: {
      any: {
        allowOnly: '两次输入的密码不一致'
      }
    }
  })
}

export default modal({
  resource: 'user',
  formTitle: '编辑用户',
  fields: [
    {name: 'username', label: '用户名', type: 'text'},
    {name: 'email', label: 'Email', type: 'text'},
    {name: 'old_password', label: '密码', type: 'password'},
    {name: 'new_password', label: '密码', type: 'password'},
    {name: 'password_confirm', label: '确认密码', type: 'password'}
  ],
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(async.get('user')(`/users/${match.params.id}`))
  },
  submit (values) {
    const { dispatch, match } = this.props
    const { username, email, new_password, old_password } = values
    return new Promise((resolve, reject) => {
      if (new_password) {
        if (!old_password) {
          throw new SubmissionError({old_password: 'required'})
        }
      }
      dispatch(async.patch('user')(`/users/${match.params.id}`, {username, email})).then(v => {
        this.close()
        toastr.success('恭喜', '编辑成功!')
        return v
      }).then(resolve).catch(reject)
    })
  },
  validate: schema
})
