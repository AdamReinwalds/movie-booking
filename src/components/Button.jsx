import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <a href="/#" className="button" onClick={onClick}>
      {text}
    </a>
  );
};

export default Button;
