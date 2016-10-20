import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// react app 
// https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092#.l7lezc96y -> A few words about “dumb” components
// https://github.com/wix/react-dataflow-example/tree/6b115770ac82d6f78a9f209630d0e0165f359316/src

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

