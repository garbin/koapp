import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { actions as async } from '../reduxers/async'
const { FormData } = window

export default function dropzone (options) {
  const {
    onSuccess = console.log,
    onError = console.error,
    mapStateToProps = state => ({async: state.async}),
    keyName = 'files',
    ...others
  } = options
  return Component => {
    return connect(mapStateToProps)(props => {
      const upload = files => {
        const { dispatch } = props
        return Promise.all(files.map((file, idx) => {
          const data = new FormData()
          data.append('file', file, file.name)
          return dispatch(async.post(`${keyName}_${idx}`)('/files', data, {
            headers: { 'content-type': 'multipart/form-data' }
          }))
        })).then(onSuccess).catch(onError)
      }
      return (
        <Dropzone style={{}} onDrop={upload} {...others}>
          {status => <Component status={status} />}
        </Dropzone>
      )
    })
  }
}
