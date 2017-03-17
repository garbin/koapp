import React from 'react'
import grid from '../../components/resource/grid'
import { Button } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import Dropzone from 'react-dropzone'
import { Checkbox } from '../../components/form'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
const FormData = window.FormData

export function upload (files) {
  const { dispatch, intl } = this.props
  return Promise.all(files.map((file, idx) => {
    const data = new FormData()
    data.append('file', file, file.name)
    return dispatch(async.post(`files_${idx}`)('/files', data, {
      headers: { 'content-type': 'multipart/form-data' }
    }))
  })).then(v => {
    toastr.success(intl.formatMessage({id: 'success_message'}))
    this.fetch()
  })
}

export default grid({
  resource: 'file',
  body: function (children) {
    return (
      <Dropzone style={{}} ref={node => { this.dropzone = node }} disableClick onDrop={upload.bind(this)}>
        {props => {
          if (children.length === 0) {
            return (
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='dropfileszone'>
                    {props.isDragActive
                      ? <FormattedMessage id='drop_here_to_upload' />
                    : <FormattedMessage id='drag_here_to_upload' />}
                  </div>
                </div>
              </div>
            )
          } else {
            return props.isDragActive ? (
              <div className='drag-container'>
                <div className='drag-active' />
                {children}
              </div>
            ) : children
          }
        }}
      </Dropzone>
    )
  },
  item: function (item) {
    const { checklist } = this.props
    const config = this.getConfig()
    return (
      <div className='card card-gallery'>
        <div className='card-block'>
          <div className='item'
            style={{backgroundImage: `url(${item.file_path})`}} />
        </div>
        <div className='card-footer'>
          <div className='row'>
            <div className='col-xs-6'>
              <Checkbox inline value={item.id} checked={checklist[item.id] || false} onChange={this.handleItemCheck.bind(this, item)} />
            </div>
            <div className='col-xs-6 text-xs-right'>
              <Button color='link' onClick={config.deleteConfirm.bind(this, {[item.id]: true})}><i className='fa fa-trash-o' /></Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  createButton: function (props) {
    return (
      <Button color='primary' className='rounded-s' size='sm' onClick={e => this.dropzone.open()}>
        <FormattedMessage id='upload' />
      </Button>
    )
  },
  listTitle: <FormattedMessage id='file.list_title' />,
  listBrief: <FormattedMessage id='file.list_brief' />
})
