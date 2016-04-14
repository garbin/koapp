import React from 'react';
import Counter from '../../components/counter'
import config from '../../config'

import './style.scss'

class CounterApp extends React.Component {
  render(){
    return <div><Counter /></div>
  }
}

export default CounterApp;
