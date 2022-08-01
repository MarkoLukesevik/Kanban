import { useContext, useState } from "react";

import { BoardContext } from "./contexts/BoardContext";
import { ModeContext } from "./contexts/ModeContext";

import Sidebar from "./components/Sidebar/Sidebar";
import SidebarToggle from "./components/SidebarToggle/SidebarToggle";
import Header from "./components/Header/Header";
import Column from "./components/Column/Column";
import NewColumn from "./components/NewColumn/NewColumn";

import DeleteModal from "./components/DeleteModal/DeleteModal";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";
import BoardModal from "./components/BoardModal/BoardModal";
import EditTaskModal from "./components/EditTaskModal/EditTaskModal";
import EditBoardModal from "./components/EditBoardModal/EditBoardModal";

import "./App.scss";
import { ColumnsContext } from "./contexts/ColumnContext";

function App() {
  const { board, findBoard, tasks, getUpdatedTasks, addNewTask } =
    useContext(BoardContext);

  const { columns, addNewColumn } = useContext(ColumnsContext);
  const { isDark } = useContext(ModeContext);

  const [isSidebarActive, setIsSideBarActive] = useState(true);

  const toggleSidebarVisibility = () => {
    setIsSideBarActive(!isSidebarActive);
  };

  const renderAllColumns = () => {
    return columns?.map((column) => {
      return <Column key={column} name={column} tasks={tasks} />;
    });
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
        <Header />

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
          <NewColumn addNewColumn={addNewColumn} />
        </div>
      </div>
      <DeleteModal {...board} />
      <NewTaskModal columns={columns} addNewTask={addNewTask} />
      <ViewTaskModal columns={columns} getUpdatedTasks={getUpdatedTasks} />
      <EditTaskModal columns={columns} getUpdatedTasks={getUpdatedTasks} />
      <BoardModal />
      <EditBoardModal />
    </div>
  );
}

export default App;
