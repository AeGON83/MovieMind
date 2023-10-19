/** @format */

import React from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

export default function UserDataLists() {
  const { dataType } = useParams();
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
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
