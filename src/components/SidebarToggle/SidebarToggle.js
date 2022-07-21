import React from "react";

import "./SidebarToggle.scss";

function SidebarToggle({ isSideBarActive, toggle }) {
  return (
    <div
      onClick={() => toggle()}
      className={
        isSideBarActive
          ? "sidebar__activator"
          : "sidebar__activator sidebar__activator-visible"
      }
    >
      <img src="/assets/icon-show-sidebar.svg" alt="" />
    </div>
  );
}

export default SidebarToggle;
