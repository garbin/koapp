import React from 'react'
import { ButtonDropdown } from 'reactstrap'
export default class extends React.Component {
  constructor () {
    super()
    this.state = { open: false }
  }
  handleToggle () {
    this.setState({open: !this.state.open})
  }
  render () {
    return (
      <ButtonDropdown isOpen={this.state.open} toggle={this.handleToggle.bind(this)} {...this.props} />
    )
  }
}
