import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

import "./EditTaskModal.scss";

function EditTaskModal({ columns, getUpdatedTasks }) {
  const { isDark } = useContext(ModeContext);
  const {
    isEditModalActive,
    handleEditModalActivation,
    currentTask,
    handleStatusChange,
    addNewSubtask,
    deleteSubtask,
    handleCurrentTaskChange,
    handleSubtaskChange,
  } = useContext(ModalContext);

  const onSaveClick = () => {
    getUpdatedTasks();
    handleEditModalActivation();
  };

  return (
    <div
      className={
        isDark && isEditModalActive
          ? "edit-modal edit-modal-dark edit-modal-active"
          : "edit-modal" && isEditModalActive
          ? "edit-modal edit-modal-active"
          : "edit-modal"
      }
    >
      <h3>Edit Task</h3>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={currentTask.title}
        onChange={handleCurrentTaskChange}
      />

      <label>Description</label>
      <input
        type="text"
        name="description"
        value={currentTask.description}
        onChange={handleCurrentTaskChange}
      />

      <label>subtasks</label>
      {currentTask?.subtasks?.map((subtask, index) => {
        return (
          <div key={index}>
            <input
              className="subtasks"
              type="text"
              value={subtask.title}
              name={subtask.title}
              onChange={(e) => handleSubtaskChange(e, subtask)}
            />
            <button
              className="edit-modal__delete-btn"
              onClick={() => deleteSubtask(index)}
            >
              X
            </button>
          </div>
        );
      })}

      <Button
        btnText="+Add New Subtask"
        onBtnClick={() => addNewSubtask({ title: "", isCompleted: false })}
      />

      <Dropdown
        columns={columns}
        status={currentTask.status}
        handleStatusChange={handleStatusChange}
      />
      <Button btnText="Save Changes" onBtnClick={onSaveClick} />
    </div>
  );
}

export default EditTaskModal;
