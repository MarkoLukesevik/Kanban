import React, { useContext } from "react";

import { BoardContext } from "../../contexts/BoardContext";
import { ModeContext } from "../../contexts/ModeContext";

import BarContent from "../BarContent/BarContent";
import ToggleMode from "../ToggleMode/ToggleMode";

import "./Sidebar.scss";

function Sidebar({ board, findBoard, isSideBarActive, toggle }) {
  const { boards } = useContext(BoardContext);
  const { isDark, handleModeChange } = useContext(ModeContext);

  let sidebarClass =
    isDark && isSideBarActive
      ? "sidebar sidebar-dark sidebar__active"
      : "sidebar-dark" && isSideBarActive
      ? "sidebar sidebar__active sidebar-dark__active"
      : "sidebar";

  return (
    <div className={sidebarClass}>
      <div className="sidebar__logo">
        <img src="/assets/light-logo.svg" alt="" />
        <img
          src={isDark ? "/assets/kanban-dark.png" : "/assets/kanban-light.png"}
          alt=""
        />
      </div>
      <div className="sidebar__content">
        <p className="sidebar__content-title">
          ALL BOARDS ({`${boards.length}`})
        </p>
        {boards.map((item) => {
          return (
            <BarContent
              key={item.name}
              {...item}
              board={board}
              findBoard={findBoard}
            />
          );
        })}
        <div
          className={
            isDark
              ? "new-board bar-board bar-board-dark"
              : "new-board bar-board"
          }
        >
          <img className="new-board__img" src="/assets/icon-board.svg" alt="" />
          <p>+ Create New Board</p>
        </div>
      </div>
      <ToggleMode handleModeChange={handleModeChange} isDark={isDark} />
      <div
        className={
          isDark
            ? "bar-board bar-board-dark sidebar__hide"
            : "bar-board sidebar__hide"
        }
        onClick={() => toggle()}
      >
        <img src="/assets/icon-hide-sidebar.svg" alt="" />
        <p>Hide Sidebar</p>
      </div>
    </div>
  );
}

export default Sidebar;
