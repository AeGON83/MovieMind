/** @format */

import React, { useState, useEffect, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Navbar from "./Navbar";

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

  return (
		<>
			<Navbar
				navStyle={{
					height: "60px",
					// backgroundColor: "#01010177",
					position: "relative",
					top: 0,
					opacity: 1,
					zIndex: 2,
				}}
			/>
			<div
				style={{
					position:"relative",
					width: "100%",
					height: "calc(100vh - 60px)",
					overflow: "hidden",
				}}
			>
				<iframe
					onLoad={() => setLoaded(true)}
					src={`https://vidsrc.me/embed/${type}?tmdb=${id}${
						season ? `&season=${season}` : ""
					}${episode ? `&episode=${episode}` : ""}`}
					width='100%'
					height='100%'
					allowFullScreen
					title='Embedded Movie'
				></iframe>
			</div>
		</>
	);
}
