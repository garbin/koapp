import React from 'react'
import Loader from 'react-loader'
import {connect} from '../../lib/helper';
import * as fetch_actions from '../../actions/fetch';

export class Fetch extends React.Component {
  componentWillMount(){
    this.props.actions.fetch();
  }
  render(){
    var {fetch:{data, loaded, error}, actions} = this.props;
    return <Loader loaded={loaded}><pre>{error ? error : JSON.stringify(data, null, '  ')}</pre></Loader>;
  }
}

export default connect( state => ( {fetch: state.fetch} ), fetch_actions)(Fetch);
