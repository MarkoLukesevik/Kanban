import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import Edit from "../Edit/Edit";
import Dropdown from "../Dropdown/Dropdown";

import "./EditTaskModal.scss";

function EditTaskModal({ columns, getUpdatedTasks }) {
  const { isDark } = useContext(ModeContext);
  const { isEditModalActive, currentTask, editTask, deleteTask } =
    useContext(ModalContext);

  let completedSubtasks = 0;
  useEffect(() => {
    currentTask?.subtasks?.forEach((subtask) => {
      if (subtask.isCompleted) {
        completedSubtasks++;
      }
      return completedSubtasks;
    });
  }, [currentTask]);

  const toggleSubtask = (e) => {
    const { name } = e.target;
    let foundSubtask = currentTask.subtasks.find((subtask) => {
      return subtask.title === name;
    });
    let foundSubtaskIndex = currentTask.subtasks.indexOf(foundSubtask);

    foundSubtask.isCompleted = !foundSubtask.isCompleted;

    let copy = [...currentTask.subtasks];
    copy[foundSubtaskIndex] = foundSubtask;

    editTask({ ...currentTask, subtasks: copy });
  };

  const handleTaskDelete = () => {
    deleteTask(currentTask);
    getUpdatedTasks();
  };

  const handleStatusChange = (status) => {
    editTask({ ...currentTask, status: status });
  };

  return (
    <div
      className={
        isDark && isEditModalActive
          ? "modal modal-dark modal-active"
          : "modal modal-dark" && isEditModalActive
          ? "modal modal-active"
          : "modal"
      }
    >
      <Edit
        edit="Edit Task"
        onEditClick={getUpdatedTasks}
        remove="Delete Task"
        onRemoveClick={handleTaskDelete}
      />
      <h2 className="modal-title">{currentTask?.title}</h2>
      <p className="modal-description">{currentTask?.description}</p>
      <span>
        Subtasks ( {completedSubtasks} of {currentTask?.subtasks?.length} )
      </span>
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
