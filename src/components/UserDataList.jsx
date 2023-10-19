/** @format */

import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

export default function UserDataLists() {
  const { dataType } = useParams();

  let data = [
    { id: 331, type: "movie" },
    { id: 134, type: "movie" },
    { id: 341, type: "movie" },
    { id: 451, type: "movie" },
    { id: 51, type: "movie" },
    { id: 196, type: "movie" },
    { id: 155, type: "movie" },
    { id: 123, type: "movie" },
    { id: 341, type: "movie" },
    { id: 3451, type: "movie" },
    { id: 231, type: "movie" },
    { id: 4451, type: "movie" },
    { id: 441, type: "movie" },
    { id: 122, type: "movie" },
    { id: 122, type: "movie" },
    { id: 166, type: "movie" },
    { id: 241, type: "movie" },
    { id: 123, type: "movie" },
    { id: 122, type: "movie" },
    { id: 321, type: "movie" },
    { id: 31, type: "movie" },
    { id: 3341, type: "movie" },
  ];

  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };
    data.map((item) => {
      let url = `https://api.themoviedb.org/3/${item.type}/${item.id}?append_to_response=images,peoples&language=en`;

      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          setDataArr((old) => {
            return [...old, { ...response, type: item.type }];
          });
          console.log(response);
        })
        .catch((err) => console.error(err));
    });
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="list-titele">
        <h1
          style={{
            marginLeft: "4%",
          }}
        >
          {dataType}
        </h1>
      </div>
      <div
        className="movies-slides"
        style={{
          position: "relative",

          justifyContent: "center",
          width: "100%",
          height: "fit-content",
          backgroundColor: "transparent",
          top: "calc(100% - 275px)",
          rowGap: "20px",
          overflow: "hidden",
        }}
      >
        {dataArr
          ? dataArr.map((item) => (
              <MovieCard
                type={item.type}
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
          : "error"}
      </div>
    </div>
  );
}
