/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function EpisodeCard(props) {
	const { episode_number, id, name, runtime, still_path } = props;

	return (
		<Link
			className='episodeCard-card'
			// to={`/player/${id}?s=${season}&e=${number}&ms=${maxSeasons}&me=${maxEpisodes}`}
		>
			<div className='episodeCard-image'>
				<img
					src={`https://image.tmdb.org/t/p/w500${still_path}`}
					alt=''
				/>
				<button>
					<i className='fa-solid fa-play'></i>
				</button>
			</div>
			<p className='episodeCard-title'>
				{episode_number}. {name} ({runtime}m)
			</p>
		</Link>
	);
}
