import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UseAxios from "../hooks/useAxios";

const INIT_DATA = [];

export const BoardContext = createContext(INIT_DATA);

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    UseAxios("/api/boards", "boards", setBoards);
  }, []);

  const deleteBoard = (id) => {
    UseAxios(`/api/boards/${id}`, "", setBoards, "delete");
  };
  return (
    <BoardContext.Provider value={{ boards, deleteBoard }}>
      {children}
    </BoardContext.Provider>
  );
}
