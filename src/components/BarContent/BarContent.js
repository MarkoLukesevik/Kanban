import React, { useContext } from "react";

import { ModeContext } from "../../contexts/ModeContext";

import "./BarContent.scss";

function BarContent({ name, board, findBoard }) {
  const { isDark } = useContext(ModeContext);
  return (
    <div
      className={
        isDark && board?.name === name
          ? "bar-board  bar-board-dark-active"
          : "bar-board bar-board-dark" && isDark
          ? "bar-board  bar-board-dark"
          : "bar-board" && board?.name === name
          ? "bar-board bar-board-active"
          : "bar-board"
      }
      onClick={() => findBoard(name)}
    >
      <img src="/assets/icon-board.svg" alt="" />
      <p>{name}</p>
    </div>
  );
}

export default BarContent;
