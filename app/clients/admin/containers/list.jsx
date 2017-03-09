import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Input, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupButton } from 'reactstrap'
import Table, { column } from '../components/table'
import Pagination from '../components/pagination'

export class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: [1, 2]
    }
  }
  render () {
    const rows = [
      {
        id: 1,
        media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        name: '12 Myths Uncovered About IT & Software',
        sales: '46323',
        stats: '',
        category: 'Software',
        author: 'Meadow Katheryne',
        created_at: '120129'
      },
      {
        id: 2,
        media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        name: '12 Myths Uncovered About IT & Software',
        sales: '46323',
        stats: '',
        category: 'Software',
        author: 'Meadow Katheryne',
        created_at: '120129'
      }
    ]
    const columns = [
      column('id', 'ID', { preset: 'checkbox' }),
      column('media', 'Media', {
        preset: 'image',
        config: {
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
      }),
      column('name', 'Name', {
        preset: 'link',
        config: {
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
        }
      }),
      column('sales', 'Sales', {
        preset: 'text',
        config: {
          header: { props: { className: 'item-col-header item-col-sales' } },
          cell: { props: { className: 'item-col-sales' } }
        }
      }),
      column('stats', 'Stats', {
        preset: 'text',
        config: {
          header: { props: { className: 'item-col-header item-col-stats' } },
          cell: { props: { className: 'item-col-stats no-overflow' } }
        }
      }),
      column('category', 'Category', {
        preset: 'text',
        config: {
          header: { props: { className: 'item-col-header item-col-category' } },
          cell: { props: { className: 'item-col-category no-overflow' }, formatters: [ value => (<div className='no-overflow'><a href=''>{value}</a></div>) ] }
        }
      }),
      column('author', 'Author', {
        preset: 'text',
        config: {
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
        }
      }),
      column('created_at', 'Published', {
        preset: 'text',
        config: {
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
        }
      }),
      column('id', 'Action', {
        preset: 'actions',
        config: {
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
              label: '编辑',
              dropdown: item => (
                <DropdownMenu>
                  <DropdownItem>删除</DropdownItem>
                </DropdownMenu>
              )
            }
          }
        }
      })
    ]
    return (
      <article className='content items-list-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'> 资源列表&nbsp;<Link to='/form' className='btn btn-primary btn-sm rounded-s'> 添加 </Link>
                  &nbsp;
                  <Dropdown className='action' isOpen={false} toggle={function () {}}>
                    <DropdownToggle className='btn-sm rounded-s' caret> 操作 </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag='a'><i className='fa fa-pencil-square-o icon' /> 编辑 </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
          <Table rows={rows} columns={columns} />
        </div>
        <nav className='text-xs-right'>
          <Pagination onPageChange={console.log} />
        </nav>
      </article>
    )
  }
}

export default connect(state => ({ oauth: state.oauth }))(List)
