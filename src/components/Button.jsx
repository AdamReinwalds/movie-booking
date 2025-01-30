import React from "react";

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

export default Button;
