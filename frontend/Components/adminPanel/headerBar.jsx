import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./HeaderBar.css";
import { debounce } from "lodash";

function HeaderBar({ title, placeHolder, onHandleSearch }) {
  const [valueSearch, setValueSearch] = useState("");

  const handleSearch = debounce(() => {
    onHandleSearch(valueSearch);
  }, 100);

  const searchIconStyling = {
    marginLeft: "10px",
    transition: "background-color 0.2s ease-in-out", // optional: adds a smooth transition effect
    ":hover": {
      cursor: "pointer",
    },
  };

  const handleChange = (event) => {
    setValueSearch(event.target.value);
    handleSearch();
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
              onChange={handleChange}
              onKeyUp={handleChange}
            />
            <SearchIcon onClick={handleSearch} sx={searchIconStyling} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
