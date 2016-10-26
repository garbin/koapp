import React from 'react'
import { Link } from 'react-router'
import Loading from 'react-loading'

export default class extends React.Component {
  render(){
    var {index} = this.props;
    return (<div>
              Hello redux
              <div className="image"></div>
            </div>)
  }
};
