import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MovieCard(props) {
  const navigate = useNavigate();

  const {
    // pauseScrollAnimation,
    // resumeScrollAnimation,
    poster_path,
    title,
    name,
    overview,
    release_date,
    vote_average,
    first_air_date,
    type,
    id,
  } = props;

  const [showDetails, setShowDetails] = React.useState(false);
  function sanitizePath(path) {
    return path.replace(/\/+/g, "/");
  }

  function navigateToMediaPage() {
    navigate(sanitizePath(`/media/${type}/${id}`));
  }

  return (
		<div
			className='movie-card'
			onClick={navigateToMediaPage}
		>
			<div
				className='movie-card-left'
				onMouseOver={() => {
					setShowDetails(true);
					//   pauseScrollAnimation();
				}}
				onMouseLeave={() => {
					setShowDetails(false);
					//   resumeScrollAnimation();
				}}
			>
				<img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
			</div>
			<div
				className={`movie-card-right ${showDetails ? "show-card-details" : ""}`}
				onMouseOver={() => {
					setShowDetails(true);
					//   pauseScrollAnimation();
				}}
				onMouseLeave={() => {
					setShowDetails(false);
					//   resumeScrollAnimation();
				}}
			>
				<p className='movie-card-title'>
					{title}
					{name}
				</p>
				<div className='movie-card-right-details'>
					<ul>
						<li>
							{release_date}
							{first_air_date}
						</li>
						<li>{vote_average}</li>
				
					</ul>
					<div className='movie-card-right-review'>
						<p>{overview}</p>
						<a
							href=''
							target='_blank'
						>
							Read more
						</a>
					</div>
					<div className='movie-card-right-button'>
						<Link
							onClick={(e) => {
								e.stopPropagation();
							}}
							
							to={`/player/${id}`}
						>
							WATCH
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
