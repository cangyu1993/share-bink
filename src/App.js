import React, { Component } from 'react';
import './App.scss';
// import { Button } from 'element-react';
// import { Button } from 'antd';
// import ReactEcharts from 'echarts-for-react'
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
