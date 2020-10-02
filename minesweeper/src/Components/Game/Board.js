import React, { Component } from "react"; // Import React library.
import '../../Stylesheet/Stylesheet.css'; // Import style sheet for this component.
import Row from './Rows'; // Import Neccessary Component.

// Class Component:
class Board extends Component {
  // Constructor with props passed to it.
  constructor(props) {
    super(props);

    // Set state where rows of the board are equal to the following:
    this.state = {
      rows: this.createBoard(props) // Pass props through to createBoard.
    };
  }

  /* Code below is needed to update the state in response to prop changes i.e. to reset it */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }

  createBoard = props => {
    /* 2D grid created for the board game based on the number of columns and rows passed in from props. */
    let board = []; // Create an empty array for the board.
    /* Nested for loop below to add in rows and coloumns. */
    for (let i = 0; i < props.rows; i++) {
      board.push([]); // Add new array to every cell which has different properties.
      for (let j = 0; j < props.columns; j++) { // Loop through all coloumns.
        board[i].push({ // push in one object into each of the cells.
          x: j, // X position of board.
          y: i, // Y position of board.
          count: 0, // Indicates number of nearby mines.
          isOpen: false, // Cells start off closed until clicked by user.
          hasMine: false, // Initially none of the cells will have a mine.
          hasFlag: false // Initially none of the cells will have a flag.
        });
      }
    }

    // Add in randomly placed mines using for loop & Math.random() method.
    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows); // Use math.random function to create random rows.
      let randomCol = Math.floor(Math.random() * props.columns); // Use math.random function to create random columns.

      let cell = board[randomRow][randomCol];

      // Prevent cells from having multiple mines by passing additional mine into another random cell. 
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  };

  // Allow user to add and remove flags from cells: 
  flag = cell => {
    if (this.props.status === "ended") {
      return;
    }
    let rows = this.state.rows;

    cell.hasFlag = !cell.hasFlag;
    this.setState({ rows });
    this.props.changeFlagAmount(cell.hasFlag ? -1 : 1); // If cell has a flag, minus 1 otherwise add 1 to flag amount when flag is removed.
  };

  open = cell => {
    if (this.props.status === "ended") {
      return;
    }
    // Promise that finds mines around current cell asyncchronously and calculates the mines before anything else runs. 
    let asyncCountMines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    // Get rows by getting current cell that has been clicked on using its position on the board. 
    asyncCountMines.then(numberOfMines => {
      let rows = this.state.rows;

      let current = rows[cell.y][cell.x];

      /* Prevent mine from being on first user click, log it to the console and update the board. */
      if (current.hasMine && this.props.openCells === 0) {
        console.log("first click had a mine!");
        let newRows = this.createBoard(this.props); // Create new set of rows when first click contains a mine.
        this.setState({ rows: newRows }, () => { // Reset rows and open cell that user is at and check again.
          this.open(cell);
        });
      } else {
        if (!cell.hasFlag && !current.isOpen) { // if cell does not have a flag || isn't open, then call function.
          this.props.onCellClick();

          current.isOpen = true; // Current cell is open when clicked.
          current.count = numberOfMines; // Find number od mines that are near the current cell.

          this.setState({ rows });
          // if cell does not have a flag or mine, the cells around it should be open.
          if (!current.hasMine && numberOfMines === 0) {
            this.openAroundCell(cell);
          }

          if (current.hasMine && this.props.openCells !== 0) { // End game when cell is opened and has a mine in it.
            alert('Game over, you triggered a mine! Click on the face to start over.');
            this.props.endGame();
          }
        }
      }
    });
  };

  findMines = cell => {
    let minesInProximity = 0; // Increment when a surrounding cell has a mine that is set to true.
    // Search for the nearby mines within the surrounding cells.
    for (let row = -1; row <= 1; row++) { // Use indexing to loop through cells that have mines surrounding current cell.
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) { // Prevent cells out of board to do nothing to avoid reference errors.
          if (
            cell.y + row < this.state.rows.length && // Ensure that cell falls within the board game.
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              this.state.rows[cell.y + row][cell.x + col].hasMine && // Check if cell has a mine or not within board range.
              !(row === 0 && col === 0)
            ) {
              minesInProximity++; // Count surrounding mines within range around current cell.
            }
          }
        }
      }
    }
    return minesInProximity; // Return mines in proximity.
  };

  openAroundCell = cell => {
    let rows = this.state.rows;

    // Loop through each neighboring cell around current cell until a cell with a mine in it, is found.
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              !this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };

  render() {
    let rows = this.state.rows.map((cells, index) => ( // Create list of rows using map function and add in propperties.
      <Row
        cells={cells}
        open={this.open}
        flag={this.flag}
        key={index} // Key value added to uniquely identify component.
      />
    ));
    return <div className="board">{rows}</div>; // Return div that displays all of the rows in the board.
  }
}

export default Board;