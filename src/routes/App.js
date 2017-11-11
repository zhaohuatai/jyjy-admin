import React, { Component } from 'react';
import IndexLayout from '../components/layout/IndexLayout';

class App extends Component {
  render() {
    return (
      <div>
        <IndexLayout children={this.props.children}/>
      </div>
    );
  }
}

export default App;
