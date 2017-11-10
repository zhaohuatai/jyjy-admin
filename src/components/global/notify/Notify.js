import React, { Component } from 'react';
import {connect} from 'react-redux';
import Message from './Message';

const Notify = ({message})=>{
  return (
    <div>
      <Message content={message.message} type={message.messagetype}/>
    </div>
  );
};

function mapStatetoProps(state){
  return{
    message:state.global.message
  };
}

export default connect(mapStatetoProps)(Notify);