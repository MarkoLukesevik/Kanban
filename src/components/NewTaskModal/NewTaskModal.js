import React, { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

import "./NewTaskModal.scss";

function NewTaskModal({ columns }) {
  const { isDark } = useContext(ModeContext);
  const { isNewTaskModalActive, handleNewTaskModalActivating } =
    useContext(ModalContext);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subtasks: [{}],
  });

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
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
      <input
        className="subtasks"
        type="text"
        name="subtasks"
        value={newTask.subtasks}
        onChange={handleNewTaskChange}
      />
      <input
        className="subtasks"
        type="text"
        name="subtasks"
        value={newTask.subtasks}
        onChange={handleNewTaskChange}
      />

      <Button btnText="+Add New Subtask" />

      <Dropdown columns={columns} />
      <Button btnText="Create Task" />
    </div>
  );
}

export default NewTaskModal;
