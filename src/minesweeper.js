import React, { Component } from 'react';

const BoardURL = 'https://minesweeper-api.herokuapp.com'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: { board: [] },
            // gameId: '',
            level: 0,
            results: 'Start Playing!'
        }
    }

    createGame() {
        fetch(`${BoardURL}/games/`, {
            method: "POST",
            body: JSON.stringify({ difficulty: this.state.level }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(newGame => {
                this.setState({
                    game: newGame,
                    gameId: newGame.id,
                })
            })
    }

    componentDidMount() {
        this.createGame()
    }

    resetEvent = () => {
        this.createGame()
        this.setState({
            results: "Start Playing!"
        })
    }

    renderCells = (row, column) => {
        if (this.state.game.board[row][column] === "_") {
            return "◻️"
        }
        else if (this.state.game.board[row][column] === "F") {
            return "🚩"
        }
        else if (this.state.game.board[row][column] === "*") {
            return "💣"
        }
        else {
            return this.state.game.board[row][column]
        }
    }

    displayGameResult() {
        if (this.state.game.state === "lost") {
            this.setState({
                results: "You've Lost!"
            })
        }
        else if (this.state.game.state === "won") {
            this.setState({
                results: "Hey You Won!"
            })
        }
        else {
            this.setState({
                results: ""
            })
        }
    }

    clickedSquare = (row, column) => {
        if (!(this.state.game.state === "lost" || this.state.game.state === "won")) {
            fetch(`${BoardURL}/games/${this.state.gameId}/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "row": row,
                    "col": column
                })
            })
                .then(resp => resp.json())
                .then(newGame => {
                    this.setState({
                        game: newGame
                    })
                    this.displayGameResult()
                })
        }
    }

    flaggedSquare = (e, row, column) => {
        e.preventDefault()
        fetch(`${BoardURL}/games/${this.state.gameId}/flag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "row": row,
                "col": column
            })
        })
            .then(resp => resp.json())
            .then(newGame => {
                this.setState({
                    game: newGame
                })
            })
    }



    render() {
        return (
            <div className='Result'>{this.state.results}
                <div>
                    <button className='Restart-Button' onClick={this.resetEvent}>Restart Game?</button>
                </div>
                <div className='Board'>
                    {this.state.game.board.map((row, i) => {
                        return (
                            <div key={i} className='row square'>
                                {row.map((col, j) => {
                                    return (
                                        <span key={j}
                                            className='column square'
                                            onClick={() => this.clickedSquare(i, j)}
                                            onContextMenu={(e) => this.flaggedSquare(e, i, j)}>
                                            {this.renderCells(i, j)}
                                        </span>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Minesweeper