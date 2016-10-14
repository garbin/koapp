import React from 'react'
import { Link } from 'react-router'
import Loading from 'react-loading'

export default class extends React.Component {
  render(){
    var {index} = this.props;
    return (<div>
              Hello redux
            </div>)
  }
};

              // <Anime easing="easeOutElastic"
              //   duration={1000}
              //   direction="alternate"
              //   loop={true}
              //   delay={(el, index) => index * 240}
              //   translateX='13rem'
              //   scale={[.75, .9]}>
              //   <div className="blue">blue</div>
              //   <div className="blue">green</div>
              //   <div className="blue">red</div>
              // </Anime>
