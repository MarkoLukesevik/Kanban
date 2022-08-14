import { useState, createContext } from "react";
import UseAxios from "../hooks/useAxios";

export const ModalContext = createContext(false);
export function ModalProvider({ children }) {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isNewTaskModalActive, setIsNewTaskModalActive] = useState(false);
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isViewTaskModalActive, setIsViewTaskModalActive] = useState(false);

  const [currentTask, setCurrentTask] = useState({});

  const handleDeleteModalActivating = () => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };
  const handleNewTaskModalActivating = () => {
    setIsNewTaskModalActive(!isNewTaskModalActive);
  };
  const handleViewTaskActivation = () => {
    setIsViewTaskModalActive(!isViewTaskModalActive);
  };
  const handleEditModalActivation = () => {
    setIsEditModalActive(!isEditModalActive);
  };

  const editTask = (task) => {
    UseAxios(`/api/tasks/${task.id}`, setCurrentTask, "put", task);
  };

  const deleteTask = (task) => {
    UseAxios(`/api/tasks/${task.id}`, setCurrentTask, "delete", task);
  };

  const handleCurrentTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleStatusChange = (status) => {
    editTask({ ...currentTask, status: status });
  };

  const handleSubtaskChange = (e, subtask) => {
    const index = currentTask.subtasks.indexOf(subtask);
    let changedSubtasks = currentTask.subtasks;
    changedSubtasks[index] = { ...subtask, title: e.target.value };
    editTask({ ...currentTask, subtasks: changedSubtasks });
  };

  const addNewSubtask = (newSubtask) => {
    editTask({
      ...currentTask,
      subtasks: [...currentTask.subtasks, newSubtask],
    });
  };

  const deleteSubtask = (index) => {
    let subtasks = currentTask.subtasks.filter((_, i) => {
      return i !== index;
    });
    editTask({ ...currentTask, subtasks });
  };

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

  return (
    <ModalContext.Provider
      value={{
        isDeleteModalActive,
        handleDeleteModalActivating,
        isNewTaskModalActive,
        handleNewTaskModalActivating,
        isViewTaskModalActive,
        handleViewTaskActivation,
        isEditModalActive,
        handleEditModalActivation,
        currentTask,
        editTask,
        deleteTask,
        handleStatusChange,
        addNewSubtask,
        deleteSubtask,
        handleCurrentTaskChange,
        handleSubtaskChange,
        toggleSubtask,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
