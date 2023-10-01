import React, { useState, useEffect, useRef } from "react";
import MediaBackground from "./MediaBackground";
import CardSlider from "./CardSlider";

export default function PosterSection(props) {
  const { url, title } = props;

  const [posterSectionList, setPosterSectionList] = useState({});

  const apiReqOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_API_KEY,
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${url}`, apiReqOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPosterSectionList(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="poster-section">
      <div className="poster-section-title">{title}</div>

      {posterSectionList.results ? (
        <MediaBackground
          backdrop={posterSectionList.results[0].backdrop_path}
        />
      ) : (
        ""
      )}

      <CardSlider data={posterSectionList.results} />
    </div>
  );
}
