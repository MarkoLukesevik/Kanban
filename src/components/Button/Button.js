import React from "react";

import "./Button.scss";

function Button({ btnText, onBtnClick }) {
  return (
    <button onClick={onBtnClick} className="btn">
      {btnText}
    </button>
  );
}

export default Button;
