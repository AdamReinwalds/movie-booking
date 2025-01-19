import React from "react";

const ShowCase = () => {
  return (
    <ul className="showcase">
      <li>
        <div className="seat" />
        <small>N/A</small>
      </li>
      <li>
        <div className="seat selected" />
        <small>Selected</small>
      </li>
      <li>
        <div className="seat occupied" />
        <small>Occupied</small>
      </li>
    </ul>
  );
};

export default ShowCase;
