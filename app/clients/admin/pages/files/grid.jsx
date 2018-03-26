import React from 'react'
import grid, { Grid } from '../../components/resource/grid'
import { Button } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Checkbox } from '../../components/form'
import dropzone from '../../components/dropzone'
import { toastr } from 'react-redux-toastr'

export class FileGrid extends Grid {
  renderCreateButton () {
    return (
      <Button color='primary' className='rounded-s' size='sm' onClick={e => this.dropzone.open()}>
        <FormattedMessage id='upload' />
      </Button>
    )
  }
  renderItem (item) {
    const { checklist } = this.props
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
              <Button color='link' onClick={this.confirmDelete.bind(this, {[item.id]: true})}><i className='fa fa-trash-o' /></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderBody () {
    const {intl} = this.props
    const body = super.renderBody()
    const DropableList = dropzone({
      onSuccess: files => {
        toastr.success(intl.formatMessage({id: 'success_message'}))
        this.fetch()
      }
    })(props => {
      if (body.length === 0) {
        return (
          <div className='row'>
            <div className='col-sm-12'>
              <div className='dropfileszone'>
                {props.status.isDragActive
                  ? <FormattedMessage id='drop_here_to_upload' />
                  : <FormattedMessage id='drag_here_to_upload' />}
              </div>
            </div>
          </div>
        )
      } else {
        return props.status.isDragActive ? (
          <div className='drag-container'>
            <div className='drag-active' />
            {body}
          </div>
        ) : <div>{body}</div>
      }
    })
    return <DropableList disableClick refCallback={node => { this.dropzone = node }} />
  }
}

export default grid({
  resource: 'file',
  listTitle: <FormattedMessage id='file.list_title' />,
  listBrief: <FormattedMessage id='file.list_brief' />
})(FileGrid)
