import { createContext, useContext, useEffect, useState } from "react";
import UseAxios from "../hooks/useAxios";

import { BoardContext } from "../contexts/BoardContext";

const columns = [];

export const ColumnsContext = createContext(columns);

export function ColumnsProvider({ children }) {
  const { board } = useContext(BoardContext);

  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (board) {
      UseAxios(`/api/boards/${board?.id}/columns`, setColumns);
    }
  }, [board]);

  const addNewColumn = (column) => {
    UseAxios(`/api/boards/${board?.id}/columns`, setColumns, "post", column);
  };

  const editColumn = (column) => {
    UseAxios(`/api/boards/${board?.id}/columns`, setColumns, "put", column);
  };

  const deleteColumn = (column) => {
    UseAxios(`/api/boards/${board?.id}/columns`, setColumns, "delete", column);
  };

  const handleAddingColumn = () => {
    setColumns([...columns, ""]);
  };

  const handleColumnChange = (e, column) => {
    const index = columns.indexOf(column);
    let changedColumns = columns;
    changedColumns[index] = e.target.value;
    setColumns([...changedColumns]);
  };

  const handleColumnDelete = (index, method) => {
    let columnToDelete = columns.find((_, i) => {
      return i === index;
    });
    method({ name: columnToDelete });
  };

  return (
    <ColumnsContext.Provider
      value={{
        columns,
        addNewColumn,
        handleAddingColumn,
        editColumn,
        deleteColumn,
        handleColumnChange,
        handleColumnDelete,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}
