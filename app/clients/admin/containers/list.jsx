import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactabular'
import { table } from '../lib/helper'

export class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: [1, 2]
    }
  }
  render () {
    const rows = [
      { id: 2, name: 'Name', created_at: new Date() },
      { id: 1, name: 'Name', created_at: new Date() }
    ]
    const columns = [
      table.column('id', 'ID', { onCheck (items) { console.log(items) }, checkable: true }),
      table.column('name', '名称'),
      table.column('created_at', '创建时间')
    ]

    return (
      <article className='content items-list-page'>
        <div className='title-search-block'>
          <div className='title-block'>
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='title'>
                  Items
                  <a href='item-editor.html' className='btn btn-primary btn-sm rounded-s'>
                    Add New
                  </a>
                  <div className='action dropdown'>
                    <button className='btn  btn-sm rounded-s btn-secondary dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    More actions...
                    </button>
                    <div className='dropdown-menu' aria-labelledby='dropdownMenu1'>
                      <button className='dropdown-item'><i className='fa fa-pencil-square-o icon' />Mark as a draft</button>
                      <button className='dropdown-item' data-toggle='modal' data-target='#confirm-modal'><i className='fa fa-close icon' />Delete</button>
                    </div>
                  </div>
                </h3>
                <p className='title-description'> List of sample items - e.g. books, movies, events, etc... </p>
              </div>
            </div>
          </div>
          <div className='items-search'>
            <form className='form-inline'>
              <div className='input-group'>
                <input type='text' className='form-control boxed rounded-s' placeholder='Search for...' /> <span className='input-group-btn'>
                  <button className='btn btn-secondary rounded-s' type='button'>
                    <i className='fa fa-search' />
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <Table.Provider columns={columns} components={table.list}>
          <Table.Header />
          <Table.Body rows={rows} rowKey='id' />
        </Table.Provider>
        <nav className='text-xs-right'>
          <ul className='pagination'>
            <li className='page-item'> <a className='page-link' href=''>
              Prev
            </a> </li>
            <li className='page-item active'> <a className='page-link' href=''>
              1
            </a> </li>
            <li className='page-item'> <a className='page-link' href=''>
              2
            </a> </li>
            <li className='page-item'> <a className='page-link' href=''>
              3
            </a> </li>
            <li className='page-item'> <a className='page-link' href=''>
              4
            </a> </li>
            <li className='page-item'> <a className='page-link' href=''>
              5
            </a> </li>
            <li className='page-item'> <a className='page-link' href=''>
              Next
            </a> </li>
          </ul>
        </nav>
      </article>
    )
  }
}

export default connect(state => ({ oauth: state.oauth }))(List)

      // <div className="card items">
      //   <ul className="item-list striped">
      //     <li className="item item-list-header hidden-sm-down">
      //       <div className="item-row">
      //         <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //           <input  type="checkbox" className="checkbox" />
      //             <span></span>
      //           </label> </div>
      //           <div className="item-col item-col-header fixed item-col-img md">
      //             <div> <span>Media</span> </div>
      //           </div>
      //           <div className="item-col item-col-header item-col-title">
      //             <div> <span>Name</span> </div>
      //           </div>
      //           <div className="item-col item-col-header item-col-sales">
      //             <div> <span>Sales</span> </div>
      //           </div>
      //           <div className="item-col item-col-header item-col-stats">
      //             <div className="no-overflow"> <span>Stats</span> </div>
      //           </div>
      //           <div className="item-col item-col-header item-col-category">
      //             <div className="no-overflow"> <span>Category</span> </div>
      //           </div>
      //           <div className="item-col item-col-header item-col-author">
      //             <div className="no-overflow"> <span>Author</span> </div>
      //           </div>
      //           <div className="item-col item-col-header item-col-date">
      //             <div> <span>Published</span> </div>
      //           </div>
      //           <div className="item-col item-col-header fixed item-col-actions-dropdown"> </div>
      //         </div>
      //       </li>
      //       <li className="item">
      //         <div className="item-row">
      //           <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //             <input  type="checkbox" className="checkbox" />
      //               <span></span>
      //             </label> </div>
      //             <div className="item-col fixed item-col-img md">
      //               <a href="item-editor.html">
      //                 <div className="item-img rounded" ></div>
      //               </a>
      //             </div>
      //             <div className="item-col fixed pull-left item-col-title">
      //               <div className="item-heading">Name</div>
      //               <div>
      //                 <a href="item-editor.html" className="">
      //                   <h4 className="item-title">
      //                     12 Myths Uncovered About IT &amp; Software
      //                   </h4> </a>
      //                 </div>
      //               </div>
      //               <div className="item-col item-col-sales">
      //                 <div className="item-heading">Sales</div>
      //                 <div> 46323 </div>
      //               </div>
      //               <div className="item-col item-col-stats no-overflow">
      //                 <div className="item-heading">Stats</div>
      //                 <div className="no-overflow">
      //                   <div className="item-stats sparkline" data-type="bar"><canvas width="84" height="22" ></canvas></div>
      //                 </div>
      //               </div>
      //               <div className="item-col item-col-category no-overflow">
      //                 <div className="item-heading">Category</div>
      //                 <div className="no-overflow"> <a href="">Software</a> </div>
      //               </div>
      //               <div className="item-col item-col-author">
      //                 <div className="item-heading">Author</div>
      //                 <div className="no-overflow"> <a href="">Meadow Katheryne</a> </div>
      //               </div>
      //               <div className="item-col item-col-date">
      //                 <div className="item-heading">Published</div>
      //                 <div className="no-overflow"> 21 SEP 10:45 </div>
      //               </div>
      //               <div className="item-col fixed item-col-actions-dropdown">
      //                 <div className="item-actions-dropdown">
      //                   <a className="item-actions-toggle-btn"> <span className="inactive">
      //                     <i className="fa fa-cog"></i>
      //                   </span> <span className="active">
      //                   <i className="fa fa-chevron-circle-right"></i>
      //                 </span> </a>
      //                 <div className="item-actions-block">
      //                   <ul className="item-actions-list">
      //                     <li>
      //                       <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal"> <i className="fa fa-trash-o "></i> </a>
      //                     </li>
      //                     <li>
      //                       <a className="edit" href="item-editor.html"> <i className="fa fa-pencil"></i> </a>
      //                     </li>
      //                   </ul>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </li>
      //         <li className="item">
      //           <div className="item-row">
      //             <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //               <input  type="checkbox" className="checkbox" />
      //                 <span></span>
      //               </label> </div>
      //               <div className="item-col fixed item-col-img md">
      //                 <a href="item-editor.html">
      //                   <div className="item-img rounded" ></div>
      //                 </a>
      //               </div>
      //               <div className="item-col fixed pull-left item-col-title">
      //                 <div className="item-heading">Name</div>
      //                 <div>
      //                   <a href="item-editor.html" className="">
      //                     <h4 className="item-title">
      //                       50% of things doesn't really belongs to you
      //                     </h4> </a>
      //                   </div>
      //                 </div>
      //                 <div className="item-col item-col-sales">
      //                   <div className="item-heading">Sales</div>
      //                   <div> 4567 </div>
      //                 </div>
      //                 <div className="item-col item-col-stats no-overflow">
      //                   <div className="item-heading">Stats</div>
      //                   <div className="no-overflow">
      //                     <div className="item-stats sparkline" data-type="bar"><canvas width="84" height="22" ></canvas></div>
      //                   </div>
      //                 </div>
      //                 <div className="item-col item-col-category no-overflow">
      //                   <div className="item-heading">Category</div>
      //                   <div className="no-overflow"> <a href="">Hardware</a> </div>
      //                 </div>
      //                 <div className="item-col item-col-author">
      //                   <div className="item-heading">Author</div>
      //                   <div className="no-overflow"> <a href="">Alexander Sargssyan</a> </div>
      //                 </div>
      //                 <div className="item-col item-col-date">
      //                   <div className="item-heading">Published</div>
      //                   <div className="no-overflow"> 21 SEP 10:45 </div>
      //                 </div>
      //                 <div className="item-col fixed item-col-actions-dropdown">
      //                   <div className="item-actions-dropdown">
      //                     <a className="item-actions-toggle-btn"> <span className="inactive">
      //                       <i className="fa fa-cog"></i>
      //                     </span> <span className="active">
      //                     <i className="fa fa-chevron-circle-right"></i>
      //                   </span> </a>
      //                   <div className="item-actions-block">
      //                     <ul className="item-actions-list">
      //                       <li>
      //                         <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal"> <i className="fa fa-trash-o "></i> </a>
      //                       </li>
      //                       <li>
      //                         <a className="edit" href="item-editor.html"> <i className="fa fa-pencil"></i> </a>
      //                       </li>
      //                     </ul>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </li>
      //           <li className="item">
      //             <div className="item-row">
      //               <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //                 <input  type="checkbox" className="checkbox" />
      //                   <span></span>
      //                 </label> </div>
      //                 <div className="item-col fixed item-col-img md">
      //                   <a href="item-editor.html">
      //                     <div className="item-img rounded" ></div>
      //                   </a>
      //                 </div>
      //                 <div className="item-col fixed pull-left item-col-title">
      //                   <div className="item-heading">Name</div>
      //                   <div>
      //                     <a href="item-editor.html" className="">
      //                       <h4 className="item-title">
      //                         Vestibulum tincidunt amet laoreet mauris sit sem aliquam cras maecenas vel aliquam.
      //                       </h4> </a>
      //                     </div>
      //                   </div>
      //                   <div className="item-col item-col-sales">
      //                     <div className="item-heading">Sales</div>
      //                     <div> 854 </div>
      //                   </div>
      //                   <div className="item-col item-col-stats no-overflow">
      //                     <div className="item-heading">Stats</div>
      //                     <div className="no-overflow">
      //                       <div className="item-stats sparkline" data-type="bar"><canvas width="84" height="22" ></canvas></div>
      //                     </div>
      //                   </div>
      //                   <div className="item-col item-col-category no-overflow">
      //                     <div className="item-heading">Category</div>
      //                     <div className="no-overflow"> <a href="">Anywhere</a> </div>
      //                   </div>
      //                   <div className="item-col item-col-author">
      //                     <div className="item-heading">Author</div>
      //                     <div className="no-overflow"> <a href="">Some Long Author Name</a> </div>
      //                   </div>
      //                   <div className="item-col item-col-date">
      //                     <div className="item-heading">Published</div>
      //                     <div className="no-overflow"> 21 SEP 10:45 </div>
      //                   </div>
      //                   <div className="item-col fixed item-col-actions-dropdown">
      //                     <div className="item-actions-dropdown">
      //                       <a className="item-actions-toggle-btn"> <span className="inactive">
      //                         <i className="fa fa-cog"></i>
      //                       </span> <span className="active">
      //                       <i className="fa fa-chevron-circle-right"></i>
      //                     </span> </a>
      //                     <div className="item-actions-block">
      //                       <ul className="item-actions-list">
      //                         <li>
      //                           <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal"> <i className="fa fa-trash-o "></i> </a>
      //                         </li>
      //                         <li>
      //                           <a className="edit" href="item-editor.html"> <i className="fa fa-pencil"></i> </a>
      //                         </li>
      //                       </ul>
      //                     </div>
      //                   </div>
      //                 </div>
      //               </div>
      //             </li>
      //             <li className="item">
      //               <div className="item-row">
      //                 <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //                   <input  type="checkbox" className="checkbox" />
      //                     <span></span>
      //                   </label> </div>
      //                   <div className="item-col fixed item-col-img md">
      //                     <a href="item-editor.html">
      //                       <div className="item-img rounded" ></div>
      //                     </a>
      //                   </div>
      //                   <div className="item-col fixed pull-left item-col-title">
      //                     <div className="item-heading">Name</div>
      //                     <div>
      //                       <a href="item-editor.html" className="">
      //                         <h4 className="item-title">
      //                           Lorem Ipsum is not simply random text
      //                         </h4> </a>
      //                       </div>
      //                     </div>
      //                     <div className="item-col item-col-sales">
      //                       <div className="item-heading">Sales</div>
      //                       <div> 1861 </div>
      //                     </div>
      //                     <div className="item-col item-col-stats no-overflow">
      //                       <div className="item-heading">Stats</div>
      //                       <div className="no-overflow">
      //                         <div className="item-stats sparkline" data-type="bar"><canvas width="84" height="22" ></canvas></div>
      //                       </div>
      //                     </div>
      //                     <div className="item-col item-col-category no-overflow">
      //                       <div className="item-heading">Category</div>
      //                       <div className="no-overflow"> <a href="">Something</a> </div>
      //                     </div>
      //                     <div className="item-col item-col-author">
      //                       <div className="item-heading">Author</div>
      //                       <div className="no-overflow"> <a href="">Willard Bennett</a> </div>
      //                     </div>
      //                     <div className="item-col item-col-date">
      //                       <div className="item-heading">Published</div>
      //                       <div className="no-overflow"> 21 SEP 10:45 </div>
      //                     </div>
      //                     <div className="item-col fixed item-col-actions-dropdown">
      //                       <div className="item-actions-dropdown">
      //                         <a className="item-actions-toggle-btn"> <span className="inactive">
      //                           <i className="fa fa-cog"></i>
      //                         </span> <span className="active">
      //                         <i className="fa fa-chevron-circle-right"></i>
      //                       </span> </a>
      //                       <div className="item-actions-block">
      //                         <ul className="item-actions-list">
      //                           <li>
      //                             <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal"> <i className="fa fa-trash-o "></i> </a>
      //                           </li>
      //                           <li>
      //                             <a className="edit" href="item-editor.html"> <i className="fa fa-pencil"></i> </a>
      //                           </li>
      //                         </ul>
      //                       </div>
      //                     </div>
      //                   </div>
      //                 </div>
      //               </li>
      //               <li className="item">
      //                 <div className="item-row">
      //                   <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //                     <input  type="checkbox" className="checkbox" />
      //                       <span></span>
      //                     </label> </div>
      //                     <div className="item-col fixed item-col-img md">
      //                       <a href="item-editor.html">
      //                         <div className="item-img rounded" ></div>
      //                       </a>
      //                     </div>
      //                     <div className="item-col fixed pull-left item-col-title">
      //                       <div className="item-heading">Name</div>
      //                       <div>
      //                         <a href="item-editor.html" className="">
      //                           <h4 className="item-title">
      //                             Ut dui quis amet curabitur vestibulum
      //                           </h4> </a>
      //                         </div>
      //                       </div>
      //                       <div className="item-col item-col-sales">
      //                         <div className="item-heading">Sales</div>
      //                         <div> 7891 </div>
      //                       </div>
      //                       <div className="item-col item-col-stats no-overflow">
      //                         <div className="item-heading">Stats</div>
      //                         <div className="no-overflow">
      //                           <div className="item-stats sparkline" data-type="bar"><canvas width="84" height="22" ></canvas></div>
      //                         </div>
      //                       </div>
      //                       <div className="item-col item-col-category no-overflow">
      //                         <div className="item-heading">Category</div>
      //                         <div className="no-overflow"> <a href="">Something Else</a> </div>
      //                       </div>
      //                       <div className="item-col item-col-author">
      //                         <div className="item-heading">Author</div>
      //                         <div className="no-overflow"> <a href="">Ivy Lorrie</a> </div>
      //                       </div>
      //                       <div className="item-col item-col-date">
      //                         <div className="item-heading">Published</div>
      //                         <div className="no-overflow"> 21 SEP 10:45 </div>
      //                       </div>
      //                       <div className="item-col fixed item-col-actions-dropdown">
      //                         <div className="item-actions-dropdown">
      //                           <a className="item-actions-toggle-btn"> <span className="inactive">
      //                             <i className="fa fa-cog"></i>
      //                           </span> <span className="active">
      //                           <i className="fa fa-chevron-circle-right"></i>
      //                         </span> </a>
      //                         <div className="item-actions-block">
      //                           <ul className="item-actions-list">
      //                             <li>
      //                               <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal"> <i className="fa fa-trash-o "></i> </a>
      //                             </li>
      //                             <li>
      //                               <a className="edit" href="item-editor.html"> <i className="fa fa-pencil"></i> </a>
      //                             </li>
      //                           </ul>
      //                         </div>
      //                       </div>
      //                     </div>
      //                   </div>
      //                 </li>
      //                 <li className="item">
      //                   <div className="item-row">
      //                     <div className="item-col fixed item-col-check"> <label className="item-check" id="select-all-items">
      //                       <input  type="checkbox" className="checkbox" />
      //                         <span></span>
      //                       </label> </div>
      //                       <div className="item-col fixed item-col-img md">
      //                         <a href="item-editor.html">
      //                           <div className="item-img rounded" ></div>
      //                         </a>
      //                       </div>
      //                       <div className="item-col fixed pull-left item-col-title">
      //                         <div className="item-heading">Name</div>
      //                         <div>
      //                           <a href="item-editor.html" className="">
      //                             <h4 className="item-title">
      //                               Mus sociosqu etiam autem rutrum at molestie elit pulvinar
      //                             </h4> </a>
      //                           </div>
      //                         </div>
      //                         <div className="item-col item-col-sales">
      //                           <div className="item-heading">Sales</div>
      //                           <div> 95150 </div>
      //                         </div>
      //                         <div className="item-col item-col-stats no-overflow">
      //                           <div className="item-heading">Stats</div>
      //                           <div className="no-overflow">
      //                             <div className="item-stats sparkline" data-type="bar"><canvas width="84" height="22" ></canvas></div>
      //                           </div>
      //                         </div>
      //                         <div className="item-col item-col-category no-overflow">
      //                           <div className="item-heading">Category</div>
      //                           <div className="no-overflow"> <a href="">Other</a> </div>
      //                         </div>
      //                         <div className="item-col item-col-author">
      //                           <div className="item-heading">Author</div>
      //                           <div className="no-overflow"> <a href="">Evander Archie</a> </div>
      //                         </div>
      //                         <div className="item-col item-col-date">
      //                           <div className="item-heading">Published</div>
      //                           <div className="no-overflow"> 21 SEP 10:45 </div>
      //                         </div>
      //                         <div className="item-col fixed item-col-actions-dropdown">
      //                           <div className="item-actions-dropdown">
      //                             <a className="item-actions-toggle-btn"> <span className="inactive">
      //                               <i className="fa fa-cog"></i>
      //                             </span> <span className="active">
      //                             <i className="fa fa-chevron-circle-right"></i>
      //                           </span> </a>
      //                           <div className="item-actions-block">
      //                             <ul className="item-actions-list">
      //                               <li>
      //                                 <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal"> <i className="fa fa-trash-o "></i> </a>
      //                               </li>
      //                               <li>
      //                                 <a className="edit" href="item-editor.html"> <i className="fa fa-pencil"></i> </a>
      //                               </li>
      //                             </ul>
      //                           </div>
      //                         </div>
      //                       </div>
      //                     </div>
      //                   </li>
      //                 </ul>
      //               </div>
