import React, { useContext, useState } from "react";
import { ModeContext } from "../../contexts/ModeContext";
import Button from "../Button/Button";

import "./NewColumns.scss";

function NewColumn({ addNewColumn }) {
  const { isDark } = useContext(ModeContext);
  const [newColumn, setNewColumn] = useState({ name: "" });

  const handleColumnNameChange = (e) => {
    const { value } = e.target;
    setNewColumn({ name: value });
  };

  const handleAddingNewColumn = () => {
    addNewColumn(newColumn);
    setNewColumn({ name: "" });
  };

  return (
    <div className={isDark ? "new-column new-column-dark" : "new-column"}>
      + New Column
      <input
        type="text"
        value={newColumn.name}
        onChange={handleColumnNameChange}
      />
      <Button btnText="Add New Column" onBtnClick={handleAddingNewColumn} />
    </div>
  );
}

export default NewColumn;
