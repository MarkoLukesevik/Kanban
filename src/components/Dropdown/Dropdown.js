import React, { useContext, useState } from "react";
import { ModeContext } from "../../contexts/ModeContext";

import "./Dropdown.scss";

function Dropdown({ columns, status }) {
  const { isDark } = useContext(ModeContext);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  return (
    <div>
      <p className="status">Current Status</p>
      <div
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        className={isDark ? "dropdown dropdown-black" : "dropdown"}
      >
        <p>{status}</p>
        <img
          src={
            isDropdownActive
              ? "/assets/icon-chevron-up.svg"
              : "/assets/icon-chevron-down.svg"
          }
          alt=""
        />
      </div>
      <div
        className={
          isDark && isDropdownActive
            ? "dropdown-content dropdown-content-active dropdown-content-dark"
            : "dropdown-content" && isDropdownActive
            ? "dropdown-content dropdown-content-active"
            : "dropdown-content"
        }
      >
        {columns?.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
