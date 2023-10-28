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
        // console.log(response);
      })
      .catch((err) => console.error(err));
  }, [id]); 

  return (
		<div className='main-wrapper'>
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
			<img
				className='collection-img'
				src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
				alt=''
			/>
			<div className='movies-slider-containar'>
				<div
					className='movies-slides'
					style={{
						position: "relative",

						justifyContent: "center",
						width: "100%",
						height: "fit-content",
						backgroundColor: "transparent",
						top: "calc(100% - 275px)",
					
						
					}}
				>
					{data.parts ? (
						data.parts.map((item) => (
							<MovieCard
                id={item.id}
								key={item.id}
								name={item.name}
								title={item.title}
								type={item.media_type}
								overview={item.overview}
								poster_path={item.poster_path}
								vote_average={item.vote_average}
								release_date={item.release_date}
								first_air_date={item.first_air_date}
							/>
						))
					) : (
						<p>Loding...</p>
					)}
				</div>
			</div>
		</div>
	);
}
