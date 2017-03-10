import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Input, Form, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupButton } from 'reactstrap'
import Table, { column } from '../../components/table'
import responsive from '../../components/table/presets/responsive'
import Pagination from '../../components/pagination'
import { toastr } from 'react-redux-toastr'
import { actions as async } from '../../reduxers/async'
import { actions as check } from '../../reduxers/check'

export class List extends React.Component {
  componentWillMount () {
    this.props.dispatch(async.get('table')('/resources'))
  }
  componentWillUnmount () {
    this.props.dispatch(check.clear())
  }
  render () {
    const { check: checkedItems, async, dispatch } = this.props
    const items = (async.table && async.table.data) ? async.table.data : []
    const columns = [
      column('id', 'ID', responsive.checkbox({
        checkedItems,
        onCheckAll (e) {
          dispatch(check.all(e.target.checked))
        },
        onCheckItem (id, e) {
          dispatch(check.one(id, e.target.checked))
        }
      })),
      column('media', 'Media', responsive.image(
        {
          header: {
            props: {
              className: 'item-col-header fixed item-col-img md'
            }
          },
          cell: {
            props: {
              className: 'fixed item-col-img md'
            },
            href: data => 'haha'
          }
        }
      )),
      column('name', 'Name', responsive.link({
        header: {
          props: {
            className: 'item-col-header item-col-title'
          }
        },
        cell: {
          props: {
            className: 'fixed pull-left item-col-title'
          },
          href: item => 'kk'
        }
      })),
      column('sales', 'Sales', responsive.text({
        header: { props: { className: 'item-col-header item-col-sales' } },
        cell: { props: { className: 'item-col-sales' } }
      })),
      column('stats', 'Stats', responsive.text({
        header: { props: { className: 'item-col-header item-col-stats' } },
        cell: { props: { className: 'item-col-stats no-overflow' } }
      })),
      column('category', 'Category', responsive.text({
        header: { props: { className: 'item-col-header item-col-category' } },
        cell: { props: { className: 'item-col-category no-overflow' }, formatters: [ value => (<div className='no-overflow'><a href=''>{value}</a></div>) ] }
      })),
      column('author', 'Author', responsive.text({
        header: {
          props: {
            className: 'item-col-header item-col-author'
          }
        },
        cell: {
          props: {
            className: 'item-col-author'
          },
          formatters: [
            value => (<div className='no-overflow'> {value} </div>)
          ]
        }
      })),
      column('created_at', 'Published', responsive.text({
        header: {
          props: {
            className: 'item-col-header item-col-date'
          }
        },
        cell: {
          props: {
            className: 'item-col-date'
          },
          formatters: [ value => (<div className='no-overflow'> {value} </div>) ]
        }
      })),
      column('id', 'Action', responsive.actions({
        header: {
          props: {
            className: 'item-col-header item-col-actions-dropdown'
          }
        },
        cell: {
          props: {
            className: 'item-col-actions-dropdown'
          },
          actions: {
            label: <span><i className='fa fa-pencil-square-o' /> 编辑 </span>,
            dropdown: item => (
              <DropdownMenu>
                <DropdownItem onClick={e => toastr.confirm('确定删除吗', {
                  onOk: e => console.log(item),
                  onCancel: e => console.log('cancel')
                })}>删除</DropdownItem>
              </DropdownMenu>
            )
          }
        }
      }))
    ]
    return (
      <article className='content items-list-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'> 资源列表&nbsp;<Link to='/resources/create' className='btn btn-primary btn-sm rounded-s'> 添加 </Link>
                  &nbsp;
                  <ButtonDropdown style={{marginBottom: '5px'}} group toggle={function () {}}>
                    <DropdownToggle className='rounded-s' caret size='sm'>操作</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag='a'><i className='fa fa-pencil-square-o icon' /> 编辑 </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </h3>
                <p className='title-description'> 资源描述...... </p>
              </div>
            </div>
          </div>
          <div className='items-search'>
            <Form inline>
              <InputGroup>
                <Input type='text' className='boxed rounded-s' placeholder='Search for...' />
                <InputGroupButton>
                  <Button className='rounded-s'><i className='fa fa-search' /></Button>
                </InputGroupButton>
              </InputGroup>
            </Form>
          </div>
        </div>
        <div className='card items'>
          <Table rows={items} columns={columns} />
        </div>
        <nav className='text-xs-right'>
          <Pagination onPageChange={console.log} />
        </nav>
      </article>
    )
  }
}

export default connect(state => ({ async: state.async, check: state.check, items: state.items, oauth: state.oauth }))(List)
