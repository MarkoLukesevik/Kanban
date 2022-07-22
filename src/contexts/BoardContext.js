import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UseAxios from "../hooks/useAxios";

const INIT_DATA = [];

export const BoardContext = createContext(INIT_DATA);

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [isNewBoardModalActive, setIsNewBoardModalActive] = useState(false);

  useEffect(() => {
    UseAxios("/api/boards", "boards", setBoards);
  }, []);

  const handleBoardModalActivation = () => {
    console.log("tuka");
    setIsNewBoardModalActive(!isNewBoardModalActive);
  };

  const deleteBoard = (id) => {
    UseAxios(`/api/boards/${id}`, "", setBoards, "delete");
  };

  const addNewBoard = (board) => {
    UseAxios("/api/boards", "boards", setBoards, "post", board);
  };
  return (
    <BoardContext.Provider
      value={{
        boards,
        deleteBoard,
        addNewBoard,
        isNewBoardModalActive,
        handleBoardModalActivation,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
