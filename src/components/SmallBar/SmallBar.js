import React, { useContext } from "react";

import { BoardContext } from "../../contexts/BoardContext";
import { ModeContext } from "../../contexts/ModeContext";

import ToggleMode from "../ToggleMode/ToggleMode";
import BarContent from "../BarContent/BarContent";

import "./SmallBar.scss";

function SmallBar({ board, findBoard, isArrowClicked }) {
  const { boards } = useContext(BoardContext);
  const { isDark, handleModeChange } = useContext(ModeContext);
  return (
    <div
      className={
        isDark && isArrowClicked
          ? "small__bar small__bar-dark small__bar-dark-active"
          : "small__bar" && isArrowClicked
          ? "small__bar small__bar-active"
          : "small__bar"
      }
    >
      <p className="small__bar-title">{`ALL BOARDS (${boards.length})`}</p>
      {boards.map((item) => {
        return (
          <BarContent
            key={item.name}
            name={item.name}
            board={board}
            findBoard={findBoard}
          />
        );
      })}
      <div
        className={
          isDark ? "new-board bar-board bar-board-dark" : "new-board bar-board"
        }
      >
        <img className="new-board__img" src="/assets/icon-board.svg" alt="" />
        <p>+ Create New Board</p>
      </div>
      <ToggleMode handleModeChange={handleModeChange} isDark={isDark} />
    </div>
  );
}

export default SmallBar;
