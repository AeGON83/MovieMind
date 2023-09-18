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
    { dark: "#006400b3", light: "greenyellow" },
    { dark: "#8b0000b3", light: "red" },
    { dark: "#008b8bb3", light: "cyan" },
    { dark: "#2f4f4fb3", light: "lightgrey" },
    { dark: "#b8870bb3", light: "gold" },
    { dark: "#9932ccb3", light: "pink" },
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
        <form action="" className="search-bar-form">
          <input
            autoComplete="off"
            type="text"
            placeholder="Search Movies/TV Shows"
            name="q"
          ></input>
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
