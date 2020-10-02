import React, { Component } from "react"; // Import React library.
import '../../Stylesheet/Stylesheet.css'; // Import applicable Style Sheet.

/* Import all neccessary components: */
import BoardHead from "./BoardHead";
import Board from "./Board";

/* App class Component that has state: */
class Minesweeper extends Component {
  constructor() {
    super();
    /* State for minesweeper game that holds info to influence the output of render: */
    this.state = {
      gameStatus: "waiting", // Game can be in waiting, running or end game mode. Game starts off as waiting until user clicks a cell.
      time: 0, // Time for each round.
      flagCount: 10, // 10 Flags allowed per round.
      openCells: 0, // All cells start off closed at the start of each round and track all open cells after they are clicked.
      mines: 10, // Total of 10 mines are dispersed randomly across the board.
      rows: 10, // Amount of rows for board.
      columns: 10, // Amount of columns for board.
    };
    this.baseState = this.state; // JavaScript feature to add new properties to any object dynamically.
  }

  /* React component method that helps when state changes. */
  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner(); // Pass through 'checkForWinner' function.
    }
  }

  /* Function that will anounce the 'winning of game' when game's goal is achieved. */
  checkForWinner = () => {
    // If statement to return winner notification if all mines are missed.
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      }, alert("Congratulations, you mananged to survive without activating any mines!"))
    }
  }

  /* Life cycle method that handles configuration, updates of state and prepares for first render. */
  componentWillMount() {
    this.intervals = [];
  }

  // Function that wraps in funtion and the amount of time it takes to run.
  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t)); // Push in interval using function & time.
  };

  // Reset function to start  new round with mines shuffled.
  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  /* Function that ticks seconds as soon as game goes into running mode. */
  tick = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === "running") {
      let time = this.state.time + 1; // Add 1 to time.
      this.setState({ time });
    }
  };

  /* Function for end of game. */
  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
  };

  /* Function that counts down how many flags have been used. */
  changeFlagAmount = amount => {
    if (this.state.flagCount < 0) {
      alert('You are using more than given the flags for this round!');
    }
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  // If the game hasn't started yet, the game will move into running status when user clicks on a cell.
  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== "running") {
      this.setState(
        {
          gameStatus: "running"
        },
        this.setInterval(this.tick, 1000) // Timer will start as soon as user clicks on a cell and will increment time in seconds by passing in tick function.
      );
    }
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>Welcome to minesweeper!</h1>
        <h2>☼ Survive & don't blow up! ☼</h2>

        <BoardHead // Game BoardHead component.
          time={this.state.time} // Pass in time to render timer.
          flagsUsed={this.state.flagCount} // Pass in flag count to render flags used.
          reset={this.reset}
          status={this.state.gameStatus}
        />
        <Board // Game Board Component.
          openCells={this.state.openCells} // Let board know how many cells are open.
          mines={this.state.mines} // Pass through amount of mines in board.
          rows={this.state.rows} // Pass in rows.
          columns={this.state.columns} // Pass in columns.
          endGame={this.endGame} // Game goes into 'ended' status when mine is clicked.
          status={this.state.gameStatus} // Can be waiting, running or ended.
          onCellClick={this.handleCellClick} // Pass in what happens when cell is clicked.
          changeFlagAmount={this.changeFlagAmount} // Change flag amount as used.
        />
      </div>
    );
  }
}

export default Minesweeper;