import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { api } from '../redux/actions'
const { FormData } = window

export default function dropzone (options) {
  const {
    onSuccess = console.log,
    onError = console.error,
    mapStateToProps = state => ({api: state.api}),
    keyName = 'files',
    ...others
  } = options
  return Component => {
    return connect(mapStateToProps)(props => {
      const { dispatch, refCallback, api: apiState, ...othersProps } = props
      const upload = files => {
        return Promise.all(files.map((file, idx) => {
          const data = new FormData()
          data.append('file', file, file.name)
          return dispatch(api.post(`${keyName}_${idx}`)('/files', data, {
            headers: { 'content-type': 'multipart/form-data' }
          }))
        })).then(onSuccess).catch(onError)
      }
      return (
        <Dropzone style={{}} onDrop={upload} ref={refCallback} {...othersProps} {...others}>
          {status => <Component status={status} />}
        </Dropzone>
      )
    })
  }
}
