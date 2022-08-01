import React, { useContext, useState } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { ColumnsContext } from "../../contexts/ColumnContext";
import { ModeContext } from "../../contexts/ModeContext";
import Button from "../Button/Button";

import "./BoardModal.scss";

function BoardModal() {
  const { isDark } = useContext(ModeContext);
  const { addNewBoard, isNewBoardModalActive, handleBoardModalActivation } =
    useContext(BoardContext);
  const { handleColumnDelete } = useContext(ColumnsContext);

  const [newBoard, setNewBoard] = useState({
    name: "",
    columns: ["Todo", "Doing"],
  });

  const changingNewBoardName = (e) => {
    const { value } = e.target;
    setNewBoard({ ...newBoard, name: value });
  };

  const addingNewBoard = () => {
    addNewBoard(newBoard);
    handleBoardModalActivation();
    setNewBoard({
      name: "",
      columns: ["Todo", "Doing"],
    });
  };

  const handleColumnChange = (e, column) => {
    const index = newBoard.columns.indexOf(column);
    let changedColumns = newBoard.columns;
    changedColumns[index] = e.target.value;
    setNewBoard({ ...addNewBoard, columns: changedColumns });
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

      <label>Columns</label>
      {newBoard.columns.map((column, index) => {
        return (
          <div key={index}>
            <input
              className="new-board-modal__columns"
              type="text"
              value={column}
              name={column}
              onChange={(e) => handleColumnChange(e, column)}
            />
            <button
              className="new-task-modal__delete-btn"
              onClick={() => handleColumnDelete(index, setNewBoard)}
            >
              X
            </button>
          </div>
        );
      })}

      <Button
        btnText="+ Add New Column"
        onBtnClick={() =>
          setNewBoard({
            ...newBoard,
            columns: [...newBoard.columns, ""],
          })
        }
      />
      <Button btnText="Add New Board" onBtnClick={addingNewBoard} />
    </div>
  );
}

export default BoardModal;
