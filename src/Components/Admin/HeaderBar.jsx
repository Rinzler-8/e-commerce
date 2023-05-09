import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./HeaderBar.css";

function HeaderBar({ title, placeHolder, onHandleSearch }) {
  let [valueSearch, setValueSearch] = useState("");

  let handleSearch = () => {
    onHandleSearch(valueSearch);
  };

  const searchIconStyling = {
    marginLeft: "10px",
    transition: "background-color 0.2s ease-in-out", // optional: adds a smooth transition effect
    ":hover": {
      cursor: "pointer",
    },
  };

  return (
    <div className="header-bar-container">
      <div className="left-section">
        <span>{title}</span>
      </div>
      <div className="right-section">
        <div className="search-bar-wrapper">
          <div className="search-input">
            <input
              type="text"
              placeholder={placeHolder}
              value={valueSearch}
              onChange={(event) => {
                setValueSearch(event.target.value);
              }}
            />
            <SearchIcon onClick={handleSearch} sx = {{...searchIconStyling}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
