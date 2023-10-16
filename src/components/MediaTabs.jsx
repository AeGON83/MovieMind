/** @format */

import React, { useState, useEffect } from "react";
import EpisodeCard from "./EpisodeCard";

const Tabs = ({ tabData, type, id, acutualSeasons }) => {
	const [activeTab, setActiveTab] = useState(0);
	const [season, setSeason] = useState(1);
	const [episodData, setEpisodData] = useState([]);

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.REACT_APP_TMDB_API_KEY,
			},
		};

		let url = `https://api.themoviedb.org/3/${type}/${id}/season/${season}`;

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(
					"episodData",
					response,
				);
				setEpisodData(response.episodes); // Assuming episodes are in the 'episodes' property of the response object
			})
			.catch((err) => console.error(err));
	}, [season, type, id]);

	const handleTabClick = (index) => {
		setActiveTab(index);
		setSeason(index + 1);
	};

	return (
		<div className='tab-container'>
			<div className='tab-buttons'>
				{tabData.slice(-acutualSeasons).map((tab, index) => (
					<button
						key={index}
						onClick={() => handleTabClick(index)}
						className={`normal-button ${index === activeTab ? "active" : ""}`}
					>
						{`${index === activeTab ? "Season " : "S"}${index + 1}`}
					</button>
				))}
			</div>
			<div className='tab-content'>
				<div className='episodeCard-cards'>
					{episodData.length > 0 ? (
						episodData
							
							.map((episode, index) => (
								<EpisodeCard
									key={index}
									episode_number={episode.episode_number}
									id={episode.id}
									name={episode.name}
									runtime={episode.runtime}
									still_path={episode.still_path}
									season_number={episode.season_number}
								/>
							))
					) : (
						<p>No episodes available</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Tabs;
