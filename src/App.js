import { useContext, useEffect, useState } from "react";
import UseAxios from "./hooks/useAxios";

import { BoardContext } from "./contexts/BoardContext";
import { ModeContext } from "./contexts/ModeContext";

import Sidebar from "./components/Sidebar/Sidebar";
import SidebarToggle from "./components/SidebarToggle/SidebarToggle";
import Header from "./components/Header/Header";

import "./App.scss";
import Column from "./components/Column/Column";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";
import EditTaskModal from "./components/EditTaskModal/EditTaskModal";
import { ModalContext } from "./contexts/ModalContext";

function App() {
  const { boards } = useContext(BoardContext);
  const { isDark } = useContext(ModeContext);
  const { handleEditModalActivation } = useContext(ModalContext);

  const [board, setBoard] = useState([]);
  const [isSidebarActive, setIsSideBarActive] = useState(true);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setBoard(boards[0]);
  }, [boards]);

  useEffect(() => {
    UseAxios(`/api/boards/${board?.id}/columns`, "names", setColumns);
    UseAxios(`api/boards/${board?.id}/tasks`, "", setTasks);
  }, [board]);

  const toggleSidebarVisibility = () => {
    setIsSideBarActive(!isSidebarActive);
  };

  const findBoard = (name) => {
    let currentBoard = boards.find((item) => item.name === name);
    setBoard(currentBoard);
  };

  const renderAllColumns = () => {
    return columns?.map((column) => {
      return <Column key={column} name={column} tasks={tasks} />;
    });
  };

  const getUpdatedTasks = () => {
    UseAxios(`api/boards/${board?.id}/tasks`, "", setTasks);
    handleEditModalActivation();
  };

  return (
    <div className="app">
      <Sidebar
        findBoard={findBoard}
        board={board}
        isSideBarActive={isSidebarActive}
        toggle={toggleSidebarVisibility}
      />

      <SidebarToggle
        isSideBarActive={isSidebarActive}
        toggle={toggleSidebarVisibility}
      />
      <div className={!isSidebarActive ? "wrapper wrapper-wider" : "wrapper"}>
        <Header boards={boards} board={board} findBoard={findBoard} />

        <div
          className={
            isDark
              ? "app-content app-content-dark"
              : "app-content" && isSidebarActive
              ? "app-content"
              : "app-content app-content-wider"
          }
        >
          {renderAllColumns()}
        </div>
      </div>
      <DeleteModal {...board} />
      {/* <NewTaskModal columns={columns} /> */}
      <EditTaskModal columns={columns} getUpdatedTasks={getUpdatedTasks} />
    </div>
  );
}

export default App;
