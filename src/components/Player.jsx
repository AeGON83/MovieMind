/** @format */

import React, { useState, useEffect, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "./Loading";

export default function Player() {
  const { id } = useParams();
  const [s] = useSearchParams();

  const [loaded, setLoaded] = useState(false);

  const [type, setType] = useState("movie");
  const [season, setSeason] = useState();
  const [episode, setEpisode] = useState();

  useEffect(() => {
    setLoaded(false);
    if (s.has("s") && s.has("e")) {
      let nSeason = parseInt(s.get("s"));
      let nEpisode = parseInt(s.get("e"));

      if (!nSeason || !nEpisode) {
        return;
      }

      if (nSeason < 1) nSeason = 1;
      if (nEpisode < 1) nEpisode = 1;

      setType("tv");
      setSeason(nSeason);
      setEpisode(nEpisode);
    } else {
      setType("movie");
    }
  }, [id, s]);

  // let url = `https://api.riptv.net/v2/embed/${type}?id=${id}${
  // 	season ? "&season=" + season : ""
  // }${episode ? "&episode=" + episode : ""}`;

  let url = `https://vidsrc.me/embed/${type}?tmdb=${id}${
    season ? `&season=${season}` : ""
  }${episode ? `&episode=${episode}` : ""}`;
  // console.log(url)

  return (
    <Fragment>
      {!loaded && <Loading />}

      <div className="player">
        {typeof type !== "undefined" && (
          <iframe
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups-to-escape-sandbox"
            onLoad={() => setLoaded(true)}
            src={url}
            onError={(error) => console.log(error, "Failed to load iframe")}
          ></iframe>
        )}
      </div>
    </Fragment>
  );
}
