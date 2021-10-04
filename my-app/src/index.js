import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//rendering the Square component into a function component since its only contains a render method now..
// class Square extends React.Component {
//     //SQUARE is no longer keeping track of the game's state--board is..no longer need the constructor
//     // //adding constructor to change the state of the square when its clicked, to X
//     // constructor(props) {
//     //     //All react componests that have constructors always start with super(props) call
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     render() {
//         return (
//             //react re-renders the page when a square is clicked
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//                 >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//rendering the Square component into a function component since its only contains a render method now..
function Square(props){
    return (
        <button
                className="square"
                onClick={props.onClick}>
                {props.value}
            </button>
    );
}

class Board extends React.Component {
    constructor(props){
//All react componests that have constructors always start with super(props) call
        super(props);
        //keeping track of user's turns by creating a property xIsNext to handle it  
        this.state = {
            squares:Array(9).fill(null),
            xIsNext: true,
        };
    }
    //method
    handleClick(i) {
        const squares = this.state.squares.slice();
        // ignores the handleClick funtion if the game is won, or if the square at position [i] is filled
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
      }
   
    //method
    renderSquare(i) {
        //passing the prop of value and onClick to Square
    // going to change the state of the squares by having Square call this function when its clicked

        return (
            <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        var loser=""
        let status;
        if(winner && winner ==="X"){
            loser ="O"
            status = "Winner: "+ winner + " Loser: "+ loser;
        }else if(winner && winner ==="O"){
            loser ="X"
            status = "Winner: "+ winner + " Loser: "+ loser;
        }
        else{
            status= 'Next player: '+(this.state.xIsNext? 'X': 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
//helper
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
