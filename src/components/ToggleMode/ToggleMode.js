import React from "react";
import Switch from "react-switch";

import "./ToggleMode.scss";

function ToggleMode({ handleModeChange, isDark }) {
  return (
    <div className={isDark ? "toggle__mode toggle__mode-dark" : "toggle__mode"}>
      <img src="/assets/icon-light-theme.svg" alt="" />
      <Switch
        onChange={handleModeChange}
        checked={isDark}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor={"#635fc7"}
        offColor={"#828fa3"}
      />
      <img src="/assets/icon-dark-theme.svg" alt="" />
    </div>
  );
}

export default ToggleMode;
