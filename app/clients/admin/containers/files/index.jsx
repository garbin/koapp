import React from 'react'
import { Route } from 'react-router'
import List from './list'
import Edit from './edit'
import Create from './create'

export default props => {
  return (
    <List>
      <Route path='/users/:id/edit' component={Edit} />
      <Route path='/users/create' component={Create} />
    </List>
  )
}
