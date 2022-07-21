import React, { useContext, useState } from "react";
import { ModeContext } from "../../contexts/ModeContext";

import "./Edit.scss";

function Edit({ edit, onEditClick, remove, onRemoveClick }) {
  const { isDark } = useContext(ModeContext);
  const [isKebapMenuActive, setIskebapMenuActive] = useState(false);

  const handleEditClick = () => {
    onEditClick();
    setIskebapMenuActive(!isKebapMenuActive);
  };

  const handleDeleteClick = () => {
    onRemoveClick();
    setIskebapMenuActive(!isKebapMenuActive);
  };
  return (
    <>
      <img
        onClick={() => setIskebapMenuActive(!isKebapMenuActive)}
        className={isDark ? "edit edit-dark" : "edit"}
        src="/assets/icon-vertical-ellipsis.svg"
        alt=""
      />
      <div
        className={
          isDark && isKebapMenuActive
            ? "edit__modal edit__modal-active edit__modal-dark"
            : "edit__modal" && isKebapMenuActive
            ? "edit__modal edit__modal-active"
            : "edit__modal"
        }
      >
        <p onClick={handleEditClick} className="edit__modal-edit">
          {edit}
        </p>
        <p onClick={handleDeleteClick} className="edit__modal-delete">
          {remove}
        </p>
      </div>
    </>
  );
}

export default Edit;
