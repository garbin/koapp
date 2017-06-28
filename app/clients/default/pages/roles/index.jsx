import React from 'react'
import { Route } from 'react-router'
import List from './list'
import Edit from './edit'
import Create from './create'

export default props => {
  return (
    <List {...props}>
      <Route path='/roles/create' component={Create} />
      <Route path='/roles/:id/edit' component={Edit} />
    </List>
  )
}
