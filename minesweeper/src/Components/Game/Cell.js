import React from "react"; // Import React library.

/*
 Create stateless Cell Component that will pass information down.
 ALl conditions of when cell is clicked are passed down below.
 */
const Cell = props => {
  let cell = () => {
    if (props.data.isOpen) { // If cell is open condition.
      if (props.data.hasMine) { // If cell has a mine condition.
        return (
          <div
            className="cell open"
            onContextMenu={e => { // Add mouse click event handler.
              e.preventDefault(); // Prevent default browser behaviour.
            }}
            onClick={() => props.open(props.data)} // Pass in data on click.
          >
            <span className='mine' role='img' aria-label='mine'>&#128165;</span> {/* Mine image code is wrapped between span tags. */}
          </div>
        );
      } else if (props.data.count === 0) { // Board game cell conditions:
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          />
        );
      } else {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            {props.data.count}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
      return (
        <div
          className="cell open-flag"
          onContextMenu={e => {

            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        >
          <span role='img' aria-label='flag'>&#127988;</span> {/* Flag Image code. */}
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        />
      );
    }
  };
  return cell();
};

export default Cell;