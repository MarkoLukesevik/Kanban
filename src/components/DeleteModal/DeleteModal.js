import React, { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import Button from "../Button/Button";

import "./DeleteModal.scss";

function DeleteModal({ name, id }) {
  const { deleteBoard } = useContext(BoardContext);
  const { isDark } = useContext(ModeContext);
  const { isDeleteModalActive, handleDeleteModalActivating } =
    useContext(ModalContext);

  const handleBoardDelete = () => {
    deleteBoard(id);
    handleDeleteModalActivating();
  };

  return (
    <div
      className={
        isDark && isDeleteModalActive
          ? "delete-modal delete-modal-active  delete-modal-dark"
          : "delete-modal" && isDeleteModalActive
          ? "delete-modal delete-modal-active"
          : "delete-modal"
      }
    >
      <h3 className="delete-modal__title">Delete this board?</h3>
      <p className="delete-modal__text">
        Are you sure you want to delete the "{name}" board? This action will
        remove all columns and tasks and cannot be reversed.
      </p>
      <div className="delete-modal__buttons">
        <Button btnText="Delete" onBtnClick={handleBoardDelete} />
        <Button btnText="Cancel" onBtnClick={handleDeleteModalActivating} />
      </div>
    </div>
  );
}

export default DeleteModal;
