import React from "react"; // Import React library.
import '../../Stylesheet/Stylesheet.css'; // Import applicable Style Sheet.

/* Import React typechecking property to check for bugs: */
import PropTypes from "prop-types";

// Craete Boardhead that contains timer, flag count and reset button.
const BoardHead = props => {
  // Variables for minutes and seconds.
  let minutes = Math.floor(props.time / 60); // Use math.floor to round time off to nearest integral.
  let formattedSeconds = props.time - minutes * 60 || 0;

  formattedSeconds =
    // ternary operator:
    formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds; // If seconds are less than 10, then zero will be infront of it.
  let time = `${minutes}:${formattedSeconds}`; // Time variable using string literals.
  let status =
    props.status === "running" || props.status === "waiting" ? (
      // Happy face emoji added for running and waiting game mode.
      <span className='happy-face' role='img' aria-label='angel face'>&#128519;</span>
    ) : (
        // Sad face emoji added for end of game mode.
        <span className="sad-face" role='img' aria-label='crushed face'>&#128534;</span>
      );
  return (
    <div className="board-head">
      <div className="flag-count"> Flags: {props.flagsUsed}</div> {/* Pass in flag count. */}
      <button className="reset" onClick={props.reset}> {/* Pass through reset button. */}
        {status}
      </button>
      <div className="timer">Time: {time}</div> {/* Pass through time. */}
    </div>
  );
};

// Ensure that data received is valid:
BoardHead.propTypes = {
  time: PropTypes.number.isRequired,
  flagsUsed: PropTypes.number.isRequired
};

export default BoardHead;