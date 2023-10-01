import React from "react";




export default function MovieCard(props) {
	const {poster_path, title,name,overview,release_date,vote_average,first_air_date}=props;

	const [showDetails, setShowDetails] = React.useState(false);
	return (
		<div className='movie-card'>
			<div
				className='movie-card-left'
				onMouseOver={() => setShowDetails(true)}
				onMouseLeave={() => setShowDetails(false)}
			>
				
				<img src={`https://image.tmdb.org/t/p/w200${
                    poster_path
                      }`} />
			</div>
			<div
				className={`movie-card-right ${showDetails ? "show-card-details" : ""}`}
				onMouseOver={() => setShowDetails(true)}
				onMouseLeave={() => setShowDetails(false)}
			>
				<h1>{title}{name}</h1>
				<div className='movie-card-right-details'>
					<ul>
						<li>{release_date}{first_air_date}</li>
						<li>{vote_average}</li>
						<li>Action</li>
					</ul>
					<div className='movie-card-right-review'>
						<p>
						{overview}
						</p>
						<a
							href=''
							target='_blank'
						>
							Read more
						</a>
					</div>
					<div className='movie-card-right-button'>
						<a
							href=''
							target='_blank'
						>
							WATCH
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
