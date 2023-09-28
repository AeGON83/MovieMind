import { useState, useEffect } from "react";
import Badge from "./Badge";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [toggleSearchType, setToggleSearchType] = useState(true);
  const [searchAutocompleteList, setSearchAutocompleteList] = useState({});
  const [queryString, setQueryString] = useState("");
  const apiReqOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_API_KEY,
      // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWZiMmU4NWMyMGFiZjE4N2E3ZjExYzMzZjg3ZjdhZSIsInN1YiI6IjY1MTNiYjM0ZWE4NGM3MDE0ZWY5OWE0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3GRTSbPgz-69Er0gA4Mgx8QOkucmrxqQdmO6FmZbr7s",
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${queryString}&include_adult=false&language=en-US&page=1`,
      apiReqOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSearchAutocompleteList(response);
      })
      .catch((err) => console.error(err));
  }, [queryString]);

  function handleSearchChange(e) {
    setQueryString(e.target.value);
  }

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
          className={`search-bar-form ${
            queryString ? "search-bar-form-focus" : ""
          }`}
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Search Movies/TV Shows"
            className="homepage-search-bar"
            value={queryString}
            onChange={handleSearchChange}
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
          <ul
            className={`search-auto-complete-container ${
              searchAutocompleteList.results ? "show-suggestions" : ""
            }`}
          >
            {searchAutocompleteList.results ? (
              searchAutocompleteList.results.map((item) => {
                return (
                  <li>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${
                        item.poster_path
                          ? item.poster_path
                          : item.backdrop_path + item.profile_path
                          ? item.profile_path
                          : ""
                      }`}
                    />
                    <div>
                      <p>
                        {item.title
                          ? item.title
                          : "" + item.name
                          ? item.name
                          : "" + item.original_name
                          ? item.original_name
                          : "" + item.known_for_department
                          ? item.known_for_department
                          : ""}
                      </p>
                      <p>
                        {item.first_air_date
                          ? item.first_air_date
                          : "" + item.release_date
                          ? item.release_date
                          : "" + item}
                        {"  •  "}
                        {item.media_type}
                      </p>
                    </div>
                  </li>
                );
              })
            ) : (
              <p>Can Not Fetch Data....</p>
            )}
          </ul>
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
