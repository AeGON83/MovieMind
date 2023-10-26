/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./user/AuthContext";

export default function Navbar({ navStyle }) {
	const navigate = useNavigate();
	const navigateToHomepage = () => {
		navigate("/");
	};

	let { currentUser } = useAuth();

	return (
		<div
			className='navbar-container'
			style={navStyle}
		>
			<div className='navbar-wrapper'>
				<div className='navbar-title'>
					<div
						className='navbar-title-logo'
						onClick={navigateToHomepage}
					></div>
					<p onClick={navigateToHomepage}>MovieMind</p>
				</div>

				<ul className='navbar-items'>
					<li onClick={() => navigate("/community")}>
						Community
						
					</li>
					<li onClick={() => navigate("/MovieSection")}>Moveis</li>
					<li onClick={() => navigate("/TvSection")}>Web Series</li>
					<li onClick={() => navigate("/DiscoverPage/28")}>Discover</li>
					<li onClick={() => navigate("/user/favorites")}>Favorites</li>
					<li onClick={() => navigate("/user/watchList")}>Watchlist</li>
				</ul>
				<div className='navbar-buttons-wrapper'>
					<button
						className='normal-button'
						id='signin-button'
					>
						{currentUser ? (
							<Link to='/account'>Account</Link>
						) : (
							<Link to='/signup'>Sign In</Link>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
