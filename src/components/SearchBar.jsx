import React from "react";
import Badge from "./Badge";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [toggleSearchType, setToggleSearchType] = React.useState(true);
  const badgeList = [
    "Action",
    "Sci-fi",
    "Romance",
    "Horror",
    "Drama",
    "Thriller",
    "Comedy",
    "Fantasy",
    "Mythology",
    "History",
    "All",
  ];
  const badgeColorList = [
    "greenyellow",
    "red",
    "cyan",
    "lightgrey",
    "gold",
    "pink",
  ];
  const makeBadgeColor = (index) => {
    return badgeColorList[index % badgeColorList.length];
    // return badgeColorList[
    //   Math.floor(Math.random() * (badgeColorList.length - 1))
    // ];
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-title-container">
        <p>Welcome to MovieMind, </p>
        <p>The gateway to your Cinematic Experience!</p>
      </div>
      <div className="search-bar">
        <form
          action=""
          onSubmit={(e) => e.preventDefault()}
          className="search-bar-form"
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Search Movies/TV Shows"
            className="homepage-search-bar"
            // name="q"
          />
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
      <div className="badges-container">
        {badgeList.map((item, index) => {
          return (
            <Badge key={index} text={item} color={makeBadgeColor(index)} />
          );
        })}
      </div>
    </div>
  );
}
