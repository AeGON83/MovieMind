/** @format */

import React, { useState, useEffect, Fragment } from "react";
import { useParams, useSearchParams , Link} from "react-router-dom";
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
			<div className='player'>
				{typeof type !== "undefined" && (
					<iframe
						onLoad={() => setLoaded(true)}


						src={`https://vidsrc.me/embed/${type}?tmdb=${id}${
							season ? `&season=${season}` : ""
						}${episode ? `&episode=${episode}` : ""}`}

						// src={`https://api.riptv.net/v2/embed/${type}?id=${id}${
						// 	season ? `&season=${season}` : ""
						// }${episode ? `&episode=${episode}` : ""}`}


						allowFullScreen
						title='Embedded Movie'
						></iframe>
				)}

				{loaded && (
					<div className='overlay'>
						<Link to='/'>
							<i className='fa-solid fa-home'></i>
						</Link>

						<Link to={`/media/${type}/${id}`}>
							<i className='fa-solid fa-close'></i>
						</Link>
					</div>
				)}
			</div>
		</>
	);
}
