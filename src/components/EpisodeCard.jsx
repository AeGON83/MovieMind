/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function EpisodeCard(props) {
  const { episode_number, id, name, runtime, still_path, season_number } =
    props;

  const type = "tv";
  console.log("card", id);

  return (
    <Link
      className="episodeCard-card"
      to={`https://vidsrc.me/embed/${type}?tmdb=${id}${
        season_number ? `&season=${season_number}` : ""
      }${episode_number ? `&episode=${episode_number}` : ""}`}

      // to={`https://vidsrc.me/embed/${type}?tmdb=${id}${
      // 	season_number ? `&season=${season_number}` : ""
      // }${episode_number ? `&episode=${episode_number}` : ""}`}
    >
      <div className="episodeCard-image">
        <img src={`https://image.tmdb.org/t/p/w500${still_path}`} alt="" />
        <button>
          <i className="fa-solid fa-play"></i>
        </button>
      </div>
      <p className="episodeCard-title">
        {episode_number}. {name} ({runtime}m)
      </p>
    </Link>
  );
}
