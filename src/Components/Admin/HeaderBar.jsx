import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./HeaderBar.css";

function HeaderBar({ title, placeHolder }) {
  return (
    <div className="header-bar-container">
      <div className="left-section">
        <span>{title}</span>
      </div>
      <div className="right-section">
        <div className="search-bar-wrapper">
          <div className="search-input">
            <input type="text" placeholder={placeHolder} />
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
