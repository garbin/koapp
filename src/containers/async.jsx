import React from 'react'
import Loader from 'react-loader'
import {connect} from '../lib/helper';
import * as async_actions from '../actions/async';

export class Async extends React.Component {
  componentWillMount(){
    this.props.actions.fetch();
  }
  render(){
    var {async:{data, loading, loaded, error}, actions} = this.props;
    return <Loader loaded={loaded}><pre>{error ? error : JSON.stringify(data, null, '  ')}</pre></Loader>;
  }
}

export default connect( state => ( {async: state.async} ), async_actions)(Async);
