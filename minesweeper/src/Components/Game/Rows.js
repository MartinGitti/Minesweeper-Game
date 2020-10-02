import React from "react"; // Import React library.
import Cell from "./Cell"; // Import neccessary Component.

// Create stateless Row component that contains all of cells.
const Row = props => {
  let cells = props.cells.map((data, index) => ( // Create bunch of cells that will contain data and index.
    <Cell data={data} open={props.open} flag={props.flag} key={index} />
  ));
  return <div className="row">{cells}</div>; // Return the cells that were made.
};

export default Row;