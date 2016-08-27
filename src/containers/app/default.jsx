import React from 'react'
import { Well } from 'react-bootstrap'
import { Link } from 'react-router'

export default class extends React.Component {
  render(){
    var {index} = this.props;
    return (<Well>
              Hello! Redux
            </Well>)
  }
};
