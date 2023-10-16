import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Badge from "./Badge";
import Loading from "./Loading";
import ImageSlider from "./ImageSlider";
import { useParams } from "react-router-dom";
import whitePlayIcon from "../assets/icons/play-icon-white.png";

import MediaTabs from "./MediaTabs";
import EpisodeCard from "./EpisodeCard";


export default function MediaPage() {
  const [mediaData, setMediaData] = useState({});
  const [data, setData] = useState({});
  const { id, type } = useParams();
   

  useEffect(() => {
   
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

	let url = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=images,peoples&language=en`

    fetch(
     url,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMediaData(response);
        console.log(response);
	
		
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let newData =
			type == "movie"
				? {
						id: mediaData.id,
						type: mediaData.media_type,
						backdrop: `https://image.tmdb.org/t/p/original${
							mediaData.backdrop_path
								? mediaData.backdrop_path
								: "/b3JtLWrdiJFCN8r9zuftgty8ddD.jpg"
						}`,
						ratingList: [
							mediaData.vote_average
								? `${mediaData.vote_average}`.substr(0, 3)
								: "-",
							mediaData.release_date
								? mediaData.release_date.substr(0, 4)
								: "-",
							mediaData.runtime
								? `${Math.floor(mediaData.runtime / 60)}h ${
										mediaData.runtime % 60
								  }m`
								: "-",
						],
						logo:
							mediaData.images && mediaData.images.logos[0]
								? `https://image.tmdb.org/t/p/original${mediaData.images.logos[0].file_path}`
								: false,
						title:
							mediaData.id && mediaData.title
								? mediaData.title
								: mediaData.original_title
								? mediaData.original_title
								: "-",

						genres:
							mediaData.id && mediaData.genres
								? mediaData.genres.map((item) => item.name)
								: false,
						tagline:
							mediaData.id && mediaData.tagline
								? mediaData.tagline.toUpperCase()
								: false,
						overview:
							mediaData.id && mediaData.overview ? mediaData.overview : false,
						watchLink: "",
				  }
				: {
						id: mediaData.id,
						type: mediaData.media_type,
						backdrop: `https://image.tmdb.org/t/p/original${
							mediaData.backdrop_path
								? mediaData.backdrop_path
								: "/b3JtLWrdiJFCN8r9zuftgty8ddD.jpg"
						}`,
						ratingList: [
							mediaData.vote_average
								? `${mediaData.vote_average}`.substr(0, 3)
								: "-",
							mediaData.first_air_date
								? `${mediaData.first_air_date.substr(0, 4)}${
										mediaData.last_air_date
											? " - " + mediaData.last_air_date.substr(0, 4)
											: "-"
								  }`
								: "-",
							mediaData.number_of_seasons
								? mediaData.number_of_seasons + " Seasons"
								: "-",
							mediaData.number_of_episodes
								? mediaData.number_of_episodes + " Episodes"
								: "-",
							mediaData.id && mediaData.status ? mediaData.status : "-",
						],
						logo:
							mediaData.images && mediaData.images.logos[0]
								? `https://image.tmdb.org/t/p/original${mediaData.images.logos[0].file_path}`
								: false,
						title:
							mediaData.id && mediaData.name
								? mediaData.name
								: mediaData.original_name
								? mediaData.original_name
								: "-",
						genres:
							mediaData.id && mediaData.genres
								? mediaData.genres.map((item) => item.name)
								: false,
						tagline:
							mediaData.id && mediaData.tagline
								? mediaData.tagline.toUpperCase()
								: false,
						overview:
							mediaData.id && mediaData.overview ? mediaData.overview : false,
						watchLink: "",
						seasons :
            mediaData.seasons
				  };
    setData(newData);
   

  }, [mediaData]);



  const badgeColorList = [
    "greenyellow",
    "red",
    "cyan",
    "lightgrey",
    "gold",
    "pink",
  ];
  const makeBadgeColor = (index) => {
    return badgeColorList[index % badgeColorList.length];
  };

  return (
		<div className='media-page'>
			<div className='media-details'>
				<Navbar
					navStyle={{
						height: "60px",
						backgroundColor: "#01010177",
						position: "absolute",
						top: 0,
						opacity: 1,
						zIndex: 2,
					}}
				/>
				{data.id ? (
					<>
						<img
							className='backdrop-img'
							src={data.backdrop}
							alt='err getting image'
						/>

						<div className='backdrop-details'>
							<ul className='media-rating-list'>
								{data.ratingList.map((item, index) => {
									if (index == 0) {
										return (
											<li key={index}>
												<div className='star-icon'></div>
												{item}
											</li>
										);
									}
									return <li key={index}>{item}</li>;
								})}
							</ul>

							{data.logo ? (
								<img
									className='media-logo'
									src={data.logo}
								/>
							) : (
								<p className='media-logo-alt'>{data.title}</p>
							)}

							{data.tagline && <p className='media-tagline'>{data.tagline}</p>}
							<ul className='media-rating-list media-genere-list'>
								{data.genres
									? data.genres.map((item, index) => {
											return (
												<Badge
													key={index}
													text={item}
													color={makeBadgeColor(index)}
												/>
											);
									  })
									: ""}
							</ul>
							<p className='media-overview'>{data.overview}</p>
							<div className='media-page-actions'>
								<button className='normal-button media-page-play-btn'>
									<img
										src={whitePlayIcon}
										alt=''
									/>
									WATCH
								</button>
								<div className='icon-button bookmark-btn'></div>
								<div className='icon-button heart-btn'></div>
							</div>
						</div>
					</>
				) : (
					<Loading />
				)}

			</div>

			 {type==="tv" && Array.isArray(data.seasons)&& (
				<MediaTabs
				acutualSeasons={mediaData.number_of_seasons}
					tabData={data.seasons}
					type={type}
					id={id}
				/>
			)}
				{mediaData.id && mediaData.images.backdrops[0] ? (
		  <ImageSlider
			imageUrls={mediaData.images.backdrops.map((item) => {
			  return `https://image.tmdb.org/t/p/original${item.file_path}`;
			})}
		  />
		) : (
		  ""
		)}
		</div>
	);
}
