import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: []
            }
        }
    }
    componentDidMount() {
        fetch(BASE_URL + "games", {
            method: "POST",
            body: JSON.stringify({ difficulty: 1 })
        }).then(resp => resp.json())
            .then(newGame => {
                console.log("game", newGame);
                this.setState({
                    game: newGame
                })
            })
    }

    render () {
        return(
            <div>
                Currently Playing: {this.state.game.id}

            {this.state.game.board.map((row, i) => {
                console.log(row, "row", i)
                return (
                    <div>
                        {row.map((col, j) => {
                            return <span className = "square">
                            {this.state.name.board[i][j]}
                            is at
                                {`${i}, ${j}`}
                                </span>
                   })}
                   </div>
               )
               return
           })}
       </div>
   );
}
}

export default Minesweeper;