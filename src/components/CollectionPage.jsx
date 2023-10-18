import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

export default function CollectionPage() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    let url = `https://api.themoviedb.org/3/collection/${id}?language=en-US`;

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, [id]); // Make sure to include id as a dependency in the useEffect dependency array

  return (
    <div className="main-wrapper" style={{ width: "100%", height: "100vh" }}>
      <Navbar />
      <img
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-10",
          opacity: "0.5",
        }}
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt=""
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          overflowY: "scroll",
          // height: "100%",

          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor:"black"
        }}
      >
        <div
          className="movies-slides"
          style={{
            position: "relative",
            // transform:"translateY(200%)",
            justifyContent: "center",
            width: "100%",
            height: "fit-content",
            backgroundColor: "transparent",
            top: "calc(100% - 275px)",
            rowGap: "20px",
            overflow: "hidden",
          }}
        >
          {data.parts ? (
            data.parts.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                title={item.title}
                name={item.name}
                overview={item.overview}
                release_date={item.release_date}
                first_air_date={item.first_air_date}
                vote_average={item.vote_average}
                type={item.media_type}
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
