import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, isAbsolute }) => {
  const absoluteButton = { position: "absolute", top: "20px", left: "20px" };
  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      style={isAbsolute ? absoluteButton : undefined}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isAbsolute: PropTypes.bool,
};

export default Button;
