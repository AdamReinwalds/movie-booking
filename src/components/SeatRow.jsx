import React from "react";
import PropTypes from "prop-types";

const seatsInRow = 8;

const getSeatClassName = (isOccupied, isSelected) => {
  if (isOccupied) return "seat occupied";
  if (isSelected) return "seat selected";
  return "seat";
};
const SeatRow = ({
  rowIndex,
  selectedSeats,
  toggleSelectedSeats,
  occupiedSeats,
}) => {
  return (
    <div className="row">
      {[...Array(seatsInRow)].map((_, seatIndex) => {
        const globalIndex = rowIndex * seatsInRow + seatIndex;
        const isSelected = selectedSeats.includes(globalIndex);
        const isOccupied = occupiedSeats.includes(globalIndex);
        return (
          <div
            key={seatIndex}
            className={getSeatClassName(isOccupied, isSelected)}
            onClick={() => !isOccupied && toggleSelectedSeats(globalIndex)}
          />
        );
      })}
    </div>
  );
};

SeatRow.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  selectedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleSelectedSeats: PropTypes.func.isRequired,
  occupiedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SeatRow;
