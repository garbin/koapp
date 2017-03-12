import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'reactstrap'

export class ResourceForm extends React.Component {
  render () {
    return (
      <article className='content item-editor-page'>
        <div className='title-block'>
          <h3 className='title'> Add new item <span className='sparkline bar' data-type='bar' /> </h3>
        </div>
        <form name='item'>
          <div className='card card-block'>
            <div className='form-group row'> <label className='col-sm-2 form-control-label text-xs-right'>
              Name:
            </label>
              <div className='col-sm-10'> <Input type='text' className='form-control boxed' placeholder='' /> </div>
            </div>
            <div className='form-group row'> <label className='col-sm-2 form-control-label text-xs-right'>
            Category:
          </label>
              <div className='col-sm-10'>
                <Input type='select' className='c-select boxed'>
                  <option>Select Category</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Input>
              </div>
            </div>
            <div className='form-group row'>
              <div className='col-sm-10 col-sm-offset-2'>
                <Button type='submit' color='primary'>Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </article>
    )
  }
}

export default connect(state => ({oauth: state.oauth}))(ResourceForm)
