import React, { Component } from 'react';
import { message } from 'antd';

const Success = message.success;

class Message extends Component {
  constructor(props){
    super(props);
    this.state={
      type:'',
      content:''
    };
	}

  render() {
    const {content, type} = this.props;
		const dom = message.success('asdasdas');
		console.log(dom);
    return (
      <div>
        {dom}
      </div>
    );
  }
}

export default Message;