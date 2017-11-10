import React, { Component } from 'react';
import IndexLayout from '../components/layout/IndexLayout';
import Global from '../components/global/Global';

class App extends Component {
  render() {
    return (
      <div>
        <Global />
        <IndexLayout children={this.props.children}/>
      </div>
    );
  }
}

export default App;