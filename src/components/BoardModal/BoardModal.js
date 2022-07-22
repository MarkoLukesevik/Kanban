import React, { useContext, useState } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { ModeContext } from "../../contexts/ModeContext";
import Button from "../Button/Button";

import "./BoardModal.scss";

function BoardModal() {
  const { isDark } = useContext(ModeContext);
  const { addNewBoard, isNewBoardModalActive, handleBoardModalActivation } =
    useContext(BoardContext);
  const [newBoard, setNewBoard] = useState({ name: "" });

  const changingNewBoardName = (e) => {
    const { value } = e.target;
    setNewBoard({ ...newBoard, name: value });
    console.log(newBoard);
  };

  const addingNewBoard = () => {
    addNewBoard(newBoard);
    handleBoardModalActivation();
  };
  return (
    <div
      className={
        isDark && isNewBoardModalActive
          ? "board-modal board-modal-dark board-modal-active"
          : "board-modal" && isNewBoardModalActive
          ? "board-modal board-modal-active"
          : "board-modal"
      }
    >
      <label>Board Name</label>
      <input
        type="text"
        value={newBoard.name}
        onChange={changingNewBoardName}
      />
      <Button btnText="Add New Board" onBtnClick={addingNewBoard} />
    </div>
  );
}

export default BoardModal;
