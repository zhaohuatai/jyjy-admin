import React, { Component } from 'react';
import UEditor from '../../../components/editor/UEditor';

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: [],
    };
  }

  testSubmit(){
    console.log(UE.getEditor('content').getContent())
  }

  render() {
    return(
      <div style={{backgroundColor: '#fff', padding: '10px' }}>
        <UEditor id="content" height="200" />
        <button onClick={this.testSubmit}>保存</button>
      </div>
    );
  }
}

export default School;
