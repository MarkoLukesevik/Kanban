import React, { useContext, useState } from "react";
import { ModeContext } from "../../contexts/ModeContext";
import { BoardContext } from "../../contexts/BoardContext";
import { ModalContext } from "../../contexts/ModalContext";

import Button from "../Button/Button";
import Edit from "../Edit/Edit";
import SmallBar from "../SmallBar/SmallBar";

import "./Header.scss";

function Header() {
  const { isDark } = useContext(ModeContext);
  const { board, findBoard, handleEditBoardModalActivation } =
    useContext(BoardContext);
  const { handleDeleteModalActivating, handleNewTaskModalActivating } =
    useContext(ModalContext);
  const [isArrowClicked, setIsArrowClicked] = useState(false);
  return (
    <header className={isDark ? "header header-dark" : "header"}>
      <img className="header__logo" src="/assets/light-logo.svg" alt="" />
      <div className="header__title">
        <h2>{board?.name}</h2>
        <img
          className="header__title-arrow"
          onClick={() => setIsArrowClicked(!isArrowClicked)}
          src={
            !isArrowClicked
              ? "/assets/icon-chevron-down.svg"
              : "/assets/icon-chevron-up.svg"
          }
          alt=""
        />
      </div>
      <Button
        btnText="+ Add New Task"
        onBtnClick={handleNewTaskModalActivating}
      />
      <Button btnText="+" onBtnClick={handleNewTaskModalActivating} />
      <Edit
        edit="Edit Board"
        onEditClick={handleEditBoardModalActivation}
        remove="Delete Board"
        onRemoveClick={handleDeleteModalActivating}
      />
      <SmallBar
        board={board}
        findBoard={findBoard}
        isArrowClicked={isArrowClicked}
      />
    </header>
  );
}

export default Header;
