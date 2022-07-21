import { useState, createContext } from "react";
import UseAxios from "../hooks/useAxios";

export const ModalContext = createContext(false);
export function ModalProvider({ children }) {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isNewTaskModalActive, setIsNewTaskModalActive] = useState(false);
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleDeleteModalActivating = () => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  const handleNewTaskModalActivating = () => {
    setIsNewTaskModalActive(!isNewTaskModalActive);
  };

  const handleEditModalActivation = () =>
    setIsEditModalActive(!isEditModalActive);

  const changeCurrentTask = (id) => {
    UseAxios(`/api/tasks/${id}`, "", setCurrentTask);
  };

  const editTask = (task) => {
    UseAxios(`/api/tasks/${task.id}`, "", setCurrentTask, "put", task);
  };

  const deleteTask = (task) => {
    UseAxios(`/api/tasks/${task.id}`, "", setCurrentTask, "delete", task);
  };

  return (
    <ModalContext.Provider
      value={{
        isDeleteModalActive,
        handleDeleteModalActivating,
        isNewTaskModalActive,
        handleNewTaskModalActivating,
        isEditModalActive,
        handleEditModalActivation,
        currentTask,
        changeCurrentTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
