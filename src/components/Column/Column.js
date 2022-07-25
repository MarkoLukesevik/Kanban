import React, { useContext } from "react";
import { ModeContext } from "../../contexts/ModeContext";

import Task from "../Task/Task";

import "./Column.scss";

function Column({ name, tasks }) {
  const { isDark } = useContext(ModeContext);
  const filteredTasks = tasks.filter((task) => task.status === name);
  return (
    <div className={isDark ? "column column-dark" : "column"}>
      <h3>
        {name} ({filteredTasks.length}){" "}
      </h3>

      <div className="column__tasks">
        {filteredTasks.map((task) => {
          return <Task key={task.title} {...task} />;
        })}
      </div>
    </div>
  );
}

export default Column;
