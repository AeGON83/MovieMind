/** @format */

import React, { useRef, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
const type = "movie";

export default function DiscoverPage(props) {
  const { id: genreId } = useParams();

  const [discoverDataList, setDiscoverDataList] = useState({});
  const [checkboxes, setCheckboxes] = useState({
    include_adultcheckbox: false,
    revenue_asc: false,
    popularity_asc: false,
    vote_count_asc: false,
    vote_average_asc: false,
    checkboprimary_release_date_asc: false,
  });

  const [newSortbyUrl, setNewSortbyUrl] = useState("");
  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        include_adult: false,

        revenue_asc: false,
        revenue_desc: false,

        popularity_asc: false,
        popularity_desc: false,

        vote_count_asc: false,
        vote_count_desc: false,

        vote_average_asc: false,
        vote_average_desc: false,

        primary_release_date_asc: false,
        primary_release_date_desc: false,
      };

      updatedCheckboxes[checkboxName] = true;
      let sortOption = "";

      if (updatedCheckboxes.revenue_asc) {
        sortOption = "&sort_by=revenue.asc";
      } else if (updatedCheckboxes.popularity_asc) {
        sortOption = "&sort_by=popularity.asc";
      } else if (updatedCheckboxes.vote_count_asc) {
        sortOption = "&sort_by=vote_count.asc";
      } else if (updatedCheckboxes.vote_average_asc) {
        sortOption = "&sort_by=vote_average.asc";
      } else if (updatedCheckboxes.primary_release_date_asc) {
        sortOption = "&sort_by=primary_release_date.asc";
      } else if (updatedCheckboxes.revenue_desc) {
        sortOption = "&sort_by=revenue.desc";
      } else if (updatedCheckboxes.popularity_decs) {
        sortOption = "&sort_by=popularity.desc";
      } else if (updatedCheckboxes.vote_count_desc) {
        sortOption = "&sort_by=vote_count.desc";
      } else if (updatedCheckboxes.vote_average_desc) {
        sortOption = "&sort_by=vote_average.desc";
      } else if (updatedCheckboxes.primary_release_date_desc) {
        sortOption = "&sort_by=primary_release_date.desc";
      }
      setNewSortbyUrl(sortOption);
      console.log("Updated Checkboxes:", updatedCheckboxes, sortOption);
      return updatedCheckboxes;
    });
  };

  const [yearUrl, setYearUrl] = useState(`&year=2022`);
  function handleYearChange(value) {
    setYearUrl(`&year=${value}`);
  }

  const options = [
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
  const [selectedOption, setSelectedOption] = useState(() => {
    let curOpt = options.filter((item) => item.id == genreId);
    return curOpt[0];
  });
  const handleOptionChange = (e) => {
    setSelectedOption(() => {
      let curOpt = options.filter((item) => item.name === e.target.value);

      return curOpt[0];
    });
  };

  let genreUrl = `&with_genres=${selectedOption.id}`;

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?${
      checkboxes.include_adult ? "include_adult=true" : "include_adult=false"
    }&include_video=false&language=en-US&page=1${newSortbyUrl}${yearUrl}${genreUrl}`;
    console.log(apiUrl);

    const apiReqOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    fetch(apiUrl, apiReqOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDiscoverDataList(response);
      })
      .catch((err) => console.error(err));
  }, [checkboxes, yearUrl, selectedOption]);

  return (
    <div>
      <Navbar />
      <div className="discover-section">
        <div className="filters-slide">
          <div className="filters-containar">
            <h2 className="filter-containar-title">Filters</h2>
            <ul className="filter-list">
              <h3 className="filter-list-category-title">category</h3>
              <li className="filter-list-item">
                <label htmlFor="checkbox1">include_adult</label>
                <label className="search-bar-switch">
                  <input
                    type="checkbox"
                    name="checkbox4444"
                    value="include_adult"
                    checked={checkboxes.include_adult}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  <span className="slider round"></span>
                </label>
              </li>
            </ul>

            <ul className="filter-list">
              <li className="filter-list-item">
                <label htmlFor="" className="filter-input-lable">
                  Genre
                </label>
                <select
                  value={selectedOption.name}
                  onChange={handleOptionChange}
                >
                  {options.map((name, id) => (
                    <option key={id} value={name.name}>
                      {name.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="filter-list-item">
                <label htmlFor="" className="filter-input-lable">
                  year
                </label>
                <input
                  type="number"
                  min={1990}
                  max={2024}
                  className="filter-input-input"
                  placeholder="2022"
                  onChange={(e) => handleYearChange(e.target.value)}
                ></input>
              </li>
            </ul>

            <ul className="filter-list">
              <h3 className="filter-list-category-title">sort_by</h3>
              <li className="filter-list-item">
                <label className="filter-sortby-label">
                  <input
                    type="radio"
                    name="radio"
                    value="revenue_asc"
                    checked={checkboxes.checkbox1}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  <span>revenue</span>
                </label>
                <label className="desc-arrow">
                  <input
                    type="radio"
                    name="radio"
                    value="revenue_desc"
                    checked={checkboxes.checkbox11}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>
              <li className="filter-list-item">
                <label className="filter-sortby-label">
                  <input
                    type="radio"
                    name="radio"
                    value="popularity_asc"
                    checked={checkboxes.checkbox2}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  <span>popularity</span>
                </label>
                <label className="desc-arrow">
                  <input
                    type="radio"
                    name="radio"
                    value="popularity_asc"
                    checked={checkboxes.checkbox22}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>
              <li className="filter-list-item">
                <label className="filter-sortby-label">
                  <input
                    type="radio"
                    name="radio"
                    value="vote_count_asc"
                    checked={checkboxes.checkbox3}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  <span>vote count</span>
                </label>
                <label className="desc-arrow">
                  <input
                    type="radio"
                    name="radio"
                    value="vote_count_desc"
                    checked={checkboxes.checkbox33}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>

              <li className="filter-list-item">
                <label className="filter-sortby-label">
                  <input
                    type="radio"
                    name="radio"
                    value="vote_average_asc"
                    checked={checkboxes.checkbox4}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  <span>vote average</span>
                </label>
                <label className="desc-arrow">
                  <input
                    type="radio"
                    name="radio"
                    value="vote_average_desc"
                    checked={checkboxes.checkbox44}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>

              <li className="filter-list-item">
                <label className="filter-sortby-label">
                  <input
                    type="radio"
                    name="radio"
                    value="primary_release_date_asc"
                    checked={checkboxes.checkbox5}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  <span>primary release date</span>
                </label>
                <label className="desc-arrow">
                  <input
                    type="radio"
                    name="radio"
                    value="primary_release_date_desc"
                    checked={checkboxes.checkbox55}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="movies-slides">
          {discoverDataList.results ? (
            discoverDataList.results.map((item) => (
              <MovieCard
                type={type}
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                title={item.title}
                name={item.name}
                overview={item.overview}
                release_date={item.release_date}
                first_air_date={item.first_air_date}
                vote_average={item.vote_average}
              />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
}
