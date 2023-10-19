import { useState, useEffect } from "react";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  // const [toggleSearchType, setToggleSearchType] = useState(true);
  const [searchAutocompleteList, setSearchAutocompleteList] = useState({});
  const [queryString, setQueryString] = useState("");
  const [selectedMedia, setSelectedMedia] = useState({
    id: "",
    media_type: "",
    showSuggestions: queryString !== "" ? true : false,
  });
  const navigate = useNavigate();

  const apiReqOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_API_KEY,
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${queryString}&include_adult=false&language=en-US&page=1`,
      apiReqOptions
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setSearchAutocompleteList(response);
      })
      .catch((err) => console.error(err));
  }, [queryString]);

  function handleSearchChange(e) {
    setQueryString(e.target.value);
  }

  const badgeList = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
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
  };
  const searchMedia = () => {
    navigate(`/media/${selectedMedia.media_type}/${selectedMedia.id}`);
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
            selectedMedia.showSuggestions && queryString != ""
              ? "search-bar-form-focus"
              : ""
          }`}
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Search Movies/TV Shows"
            className="homepage-search-bar"
            value={queryString}
            onChange={(e) => {
              handleSearchChange(e);
              setSelectedMedia({
                id: "",
                media_type: "",
                showSuggestions: true,
              });
            }}
          />
          <label className="search-bar-switch">
            {/* <input
              type="checkbox"
              checked={toggleSearchType}
              onChange={() => setToggleSearchType((oldState) => !oldState)}
            /> */}
            <span className="slider round"></span>
          </label>
          <button
            type="submit"
            className="search-bar-btn normal-button"
            onClick={searchMedia}
          >
            Search
          </button>
          {selectedMedia.showSuggestions && queryString != "" && (
            <ul
              className={`search-auto-complete-container ${
                searchAutocompleteList.results ? "show-suggestions" : ""
              }`}
            >
              {searchAutocompleteList.results ? (
                searchAutocompleteList.results.map((item) => {
                  return (
                    <li
                      onClick={() => {
                        setQueryString(
                          (item.title ? item.title : item.name)
                            ? item.title
                              ? item.title
                              : item.name
                            : item.known_for_department
                        );
                        setSelectedMedia({
                          id: item.id,
                          media_type: item.media_type,
                          showSuggestions: false,
                        });
                      }}
                    >
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
                            : "" + item.name
                            ? item.name
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
          )}
        </form>
      </div>
      <div className="badges-container">
        {badgeList.map((item, index) => {
          return (
            <Badge
              key={index}
              text={item.name}
              index={index}
              id={item.id}
              color={makeBadgeColor(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
