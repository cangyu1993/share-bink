import React, { Component } from 'react';
import './App.scss';
import { Button } from 'element-react';


class App extends Component {
  render() {
    return (
      <div className="App">
          {this.props.children}
      </div>
    );
  }
}

export default App;
