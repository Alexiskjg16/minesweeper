import React, { Component } from 'react';
import Minesweeper from './minesweeper';

class App extends Component {

  displayGameResult = (state) => {
    if (state === "youLost") {
        this.setState({
            message: "Oh No, You Lose"
        })
    } else if (state === "youWon") {
        this.setState({
            message: "Oh Yeah, You Win!"
        })
    } else {
        this.setState({
            message: "S'..."
        })
    }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Minesweeper/>
      </div>
    );
  }
}

export default App;
