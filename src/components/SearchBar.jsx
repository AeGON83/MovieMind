import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FaMagnifyingGlass } from "react-icons/fa";

export default function SearchBar() {
  const [toggleSearchType, setToggleSearchType] = React.useState(true);

  return (
    <div className="searchbar-container">
      <div className="searchbar-title-container">
        <p>Welcome to MovieMind, the gateway to your Cinematic Experience!</p>
      </div>

      {/* <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Recommend Me Movies..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form> */}

      <div className="search-bar">
        <form action="" className="search-bar-form">
          <input type="text" placeholder="Serch anything" name="q"></input>
          <label className="search-bar-switch">
            <input
              type="checkbox"
              checked={toggleSearchType}
              onChange={() => setToggleSearchType((oldState) => !oldState)}
            />
            <span className="slider round"></span>
          </label>
          <button type="submit" className="search-bar-btn normal-button">
            {toggleSearchType ? "AI " : "Normal "}Search
          </button>
        </form>
      </div>
    </div>
  );
}
