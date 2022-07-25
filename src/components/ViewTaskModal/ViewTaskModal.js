import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import Edit from "../Edit/Edit";
import Dropdown from "../Dropdown/Dropdown";

import "./ViewTaskModal.scss";

function EditTaskModal({ columns, getUpdatedTasks }) {
  const { isDark } = useContext(ModeContext);
  const {
    isViewTaskModalActive,
    handleViewTaskActivation,
    currentTask,
    deleteTask,
    handleEditModalActivation,
    handleStatusChange,
    toggleSubtask,
  } = useContext(ModalContext);

  let completedSubtasks = 0;
  currentTask?.subtasks?.forEach((subtask) => {
    if (subtask.isCompleted) {
      completedSubtasks++;
    }
    return completedSubtasks;
  });

  const handleTaskDelete = () => {
    deleteTask(currentTask);
    getUpdatedTasks();
  };

  const handleOnEditClick = () => {
    getUpdatedTasks();
    handleViewTaskActivation();
    handleEditModalActivation();
  };

  return (
    <div
      className={
        isDark && isViewTaskModalActive
          ? "modal modal-dark modal-active"
          : "modal modal-dark" && isViewTaskModalActive
          ? "modal modal-active"
          : "modal"
      }
    >
      <Edit
        edit="Edit Task"
        onEditClick={handleOnEditClick}
        remove="Delete Task"
        onRemoveClick={handleTaskDelete}
      />
      <h2 className="modal-title">{currentTask?.title}</h2>
      <p className="modal-description">{currentTask?.description}</p>
      {currentTask?.subtasks?.length ? (
        <span>
          Subtasks ( {completedSubtasks} of {currentTask?.subtasks?.length} )
        </span>
      ) : (
        <></>
      )}

      {currentTask?.subtasks?.map((subtask) => {
        return (
          <div
            key={subtask.title}
            className={
              isDark
                ? "modal__subtask-input-div modal__subtask-input-div-dark"
                : "modal__subtask-input-div"
            }
          >
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              name={subtask.title}
              value={subtask.isCompleted}
              onChange={(e) => toggleSubtask(e)}
            />
            <p className="modal__subtask-input-div-title">{subtask.title}</p>
          </div>
        );
      })}

      <Dropdown
        columns={columns}
        status={currentTask.status}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default EditTaskModal;
