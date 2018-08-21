import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: [],
                level: 0
            }
        }
    }
    createGame() {
        fetch(`${BASE_URL}games`, {
            method: "POST",
            body: JSON.stringify({ difficulty: this.state.level }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(newGame => {
                console.log(newGame)
                this.setState({
                    game: newGame
                })
            })
    }
    componentDidMount() {
        this.createGame()
    }

    checkTheAPI = (action, row, col) => {
        fetch(`${BASE_URL}games/${this.state.game.id}/${action}`, {
            method: "POST",
            body: JSON.stringify({ row: row, col: col }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(newGameState => {
                this.setState({
                    game: newGameState,
                }, () => {
                    this.props.updateMessage(this.state.game.state)
                })
            })
    }
    handleCellClick = (row, col) => {
        if (this.state.game.state !== "youLost" && this.state.game.state !== "youWon") {
           this.checkTheAPI("check", row, col)
        }

    }

    handleFlaggedCell = (event, row, col) => {
        event.preventDefault()
        this.checkTheAPI("flag", row, col)

    }

    resetEvent = () => {
        this.createGame()
    }


    render () {
        return(
            <div>
                Currently Playing: {this.state.game.id}
                
                <div>
                    <table>
                    <tbody>
                    {this.state.game.board.map((row, i) => {
                        return (
                            <tr key={i}>
                                {row.map((col, j) => {
                                    return (
                                        <td key={j}>{j}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                    </div>
           )
       </div>
   );
}
}

export default Minesweeper;