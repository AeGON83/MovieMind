import React, { useState, useEffect } from "react";
import MediaBackground from "./MediaBackground";
import CardSlider from "./CardSlider";

export default function PosterSection({ url, title }) {
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
      <div className="pTag-title-container">
        <p className="pTagTitle deepshadow">{title}</p>
      </div>

      {posterSectionList.results ? (
        <MediaBackground id={posterSectionList.results[0].id} />
      ) : (
        ""
      )}

      <CardSlider data={posterSectionList.results} />
    </div>
  );
}
