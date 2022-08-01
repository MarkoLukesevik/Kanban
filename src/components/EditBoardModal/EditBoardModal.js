import React, { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { ColumnsContext } from "../../contexts/ColumnContext";
import { ModeContext } from "../../contexts/ModeContext";

import Button from "../Button/Button";

import "./EditBoardModal.scss";

function EditBoardModal() {
  const { isDark } = useContext(ModeContext);
  const {
    isEditBoardModalActive,
    board,
    changeBoardName,

    handleEditBoardModalActivation,
  } = useContext(BoardContext);

  const {
    columns,
    handleAddingColumn,
    editColumn,
    handleColumnChange,
    handleColumnDelete,
    deleteColumn,
  } = useContext(ColumnsContext);

  const editingBoard = () => {
    handleEditBoardModalActivation();
    editColumn(columns);
  };

  return (
    <div
      className={
        isDark && isEditBoardModalActive
          ? "edit-board-modal edit-board-modal-dark edit-board-modal-active"
          : "edit-board-modal" && isEditBoardModalActive
          ? "edit-board-modal edit-board-modal-active"
          : "edit-board-modal"
      }
    >
      Edit Board
      <label>Board Name</label>
      <input
        type="text"
        name="name"
        value={board?.name}
        onChange={changeBoardName}
      />
      <label>Columns</label>
      {columns?.map((column, index) => {
        return (
          <div key={index}>
            <input
              className="subtasks"
              type="text"
              value={column}
              name={column}
              onChange={(e) => handleColumnChange(e, column)}
            />
            <button
              className="edit-modal__delete-btn"
              onClick={() => handleColumnDelete(index, deleteColumn)}
            >
              X
            </button>
          </div>
        );
      })}
      <Button btnText="+ Add New Column" onBtnClick={handleAddingColumn} />
      <Button btnText="Save Changes" onBtnClick={editingBoard} />
    </div>
  );
}

export default EditBoardModal;
