import { createContext, useEffect, useState } from "react";
import UseAxios from "../hooks/useAxios";

const INIT_DATA = [];

export const BoardContext = createContext(INIT_DATA);

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState(boards[0]);
  const [tasks, setTasks] = useState([]);
  const [isNewBoardModalActive, setIsNewBoardModalActive] = useState(false);
  const [isEditBoardModalActive, setIsEditBoardModalActive] = useState(false);

  useEffect(() => {
    UseAxios("/api/boards", "boards", setBoards);
  }, []);

  useEffect(() => {
    setBoard(boards[0]);
  }, [boards]);

  useEffect(() => {
    UseAxios(`api/boards/${board?.id}/tasks`, "", setTasks);
  }, [board]);

  const handleBoardModalActivation = () => {
    setIsNewBoardModalActive(!isNewBoardModalActive);
    setBoard({});
  };

  const handleEditBoardModalActivation = () => {
    setIsEditBoardModalActive(!isEditBoardModalActive);
  };

  const findBoard = (name) => {
    let currentBoard = boards.find((item) => item.name === name);
    setBoard(currentBoard);
  };

  const deleteBoard = (id) => {
    UseAxios(`/api/boards/${id}`, "", setBoards, "delete");
  };

  const addNewBoard = (board) => {
    UseAxios("/api/boards", "boards", setBoards, "post", board);
  };

  const editBoard = (board) => {
    UseAxios("/api/boards", "boards", setBoards, "put", board);
  };

  const changeBoardName = (e) => {
    const { name, value } = e.target;
    editBoard({ ...board, [name]: value });
  };

  const getUpdatedTasks = () => {
    UseAxios(`api/boards/${board?.id}/tasks`, "", setTasks);
  };

  const addNewTask = (task) => {
    UseAxios(`api/boards/${board.id}/tasks`, "", setTasks, "post", task);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        board,
        tasks,
        getUpdatedTasks,
        addNewTask,
        findBoard,
        deleteBoard,
        addNewBoard,
        changeBoardName,
        isNewBoardModalActive,
        handleBoardModalActivation,
        isEditBoardModalActive,
        handleEditBoardModalActivation,
        editBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
