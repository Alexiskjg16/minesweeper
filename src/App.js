import React, { Component } from 'react';
import './App.css';
import Minesweeper from './minesweeper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">It's Minesweeper!</h1>
        </header>
        <Minesweeper />
      </div>
    );
  }
}

export default App;

