import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ModeContext } from "../../contexts/ModeContext";

import "./Task.scss";

function Task(props) {
  const { isDark } = useContext(ModeContext);
  const { handleEditModalActivation, changeCurrentTask } =
    useContext(ModalContext);
  let completedSubtasks = 0;
  props.subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completedSubtasks++;
    }
    return completedSubtasks;
  });

  const handleTaskClick = () => {
    handleEditModalActivation();
    changeCurrentTask(props.id);
  };

  return (
    <div
      onClick={handleTaskClick}
      className={isDark ? "task task-dark" : "task"}
    >
      <h2>{props.title}</h2>
      <p>
        {completedSubtasks} of {props.subtasks.length} subtasks
      </p>
    </div>
  );
}

export default Task;
