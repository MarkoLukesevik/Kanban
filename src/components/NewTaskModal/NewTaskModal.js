import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

import "./NewTaskModal.scss";

function NewTaskModal({ columns, addNewTask }) {
  const { isDark } = useContext(ModeContext);
  const { isNewTaskModalActive, handleNewTaskModalActivating } =
    useContext(ModalContext);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subtasks: [
      { title: "", isCompleted: false },
      { title: "", isCompleted: false },
    ],
  });

  useEffect(() => {
    if (columns) {
      setNewTask({ ...newTask, status: columns[0] });
    }
  }, [columns]);

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const handleSubtaskChange = (e, subtask) => {
    const index = newTask.subtasks.indexOf(subtask);
    let changedSubtasks = newTask.subtasks;
    changedSubtasks[index] = { ...subtask, title: e.target.value };
    setNewTask({ ...newTask, subtasks: changedSubtasks });
  };

  const handleStatusChange = (status) => {
    setNewTask({ ...newTask, status: status });
  };

  const handleAddingNewTask = () => {
    handleNewTaskModalActivating();
    addNewTask(newTask);
  };

  const addNewSubtask = () => {
    let newSubtask = { title: "", isCompleted: false };
    setNewTask({ ...newTask, subtasks: [...newTask.subtasks, newSubtask] });
  };

  const deleteSubtask = (index) => {
    let subtasks = newTask.subtasks.filter((_, i) => {
      return i !== index;
    });
    setNewTask({ ...newTask, subtasks });
  };
  return (
    <div
      className={
        isDark && isNewTaskModalActive
          ? "new-task-modal new-task-modal-dark  new-task-modal-active"
          : "new-task-modal" && isNewTaskModalActive
          ? "new-task-modal new-task-modal-active"
          : "new-task-modal"
      }
    >
      <h3>Add New Task</h3>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleNewTaskChange}
      />

      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        name="description"
        value={newTask.description}
        onChange={handleNewTaskChange}
      />

      <label>subtasks</label>
      {newTask.subtasks.map((subtask, index) => {
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
              className="new-task-modal__delete-btn"
              onClick={() => deleteSubtask(index)}
            >
              X
            </button>
          </div>
        );
      })}

      <Button btnText="+Add New Subtask" onBtnClick={addNewSubtask} />

      <Dropdown
        columns={columns}
        status={newTask.status}
        handleStatusChange={handleStatusChange}
      />
      <Button btnText="Create Task" onBtnClick={handleAddingNewTask} />
    </div>
  );
}

export default NewTaskModal;
