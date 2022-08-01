import { createContext, useContext, useEffect, useState } from "react";

import { BoardContext } from "../contexts/BoardContext";

import UseAxios from "../hooks/useAxios";

const tasks = [];

export const TasksContext = createContext(tasks);
export function TasksProvider({ children }) {
  const { board } = useContext(BoardContext);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    UseAxios(`api/boards/${board?.id}/tasks`, setTasks);
  }, [board]);

  const getUpdatedTasks = () => {
    UseAxios(`api/boards/${board?.id}/tasks`, setTasks);
  };

  const addNewTask = (task) => {
    UseAxios(`api/boards/${board.id}/tasks`, setTasks, "post", task);
  };

  return (
    <TasksContext.Provider value={{ tasks, getUpdatedTasks, addNewTask }}>
      {children}
    </TasksContext.Provider>
  );
}
