/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
export default function Footer() {
	const navigate = useNavigate();
	return (
		<footer class='footer'>
			<div class='footer-container'>
				<div class='footer-row'>
					<div
						class='footer-col'
						style={{
							width: "30%",
							position: "relative",
							bottom: "20px",
						}}
					>
						<h4>
							<div
								className='navbar-title'
								style={{
									position: "relative",

									right: "12px",
								}}
							>
								<div className='navbar-title-logo'></div>
								<p>MovieMind</p>
							</div>
						</h4>
						<ul>
							<p
								style={{
									marginTop: "10px",
									textAlign: "justify",
									color: "#bbbbbb",
								}}
							>
								MovieMind does not store any files on our server, we only linked
								to the media which is hosted on 3rd party services.
							</p>
							<br />
							<li
								onClick={() => navigate("/AboutUs")}
								style={{
									color: "red",
									fontSize: "1.2rem",
								}}
							>
								About Us
							</li>
						</ul>
					</div>
					<div class='footer-col'>
						<h4>Navigate</h4>
						<ul>
							<li onClick={() => navigate("/MovieSection")}>Moveis</li>
							<li onClick={() => navigate("/TvSection")}>Web Series</li>
							<li onClick={() => navigate("/DiscoverPage/28")}>Discover</li>
						</ul>
					</div>
					<div class='footer-col'>
						<h4>Account</h4>
						<ul>
							<li onClick={() => navigate("/user/favorites")}>Favorites</li>
							<li onClick={() => navigate("/user/watchList")}>Watchlist</li>
							<li onClick={() => navigate("/user/ratings")}>Ratings</li>
						</ul>
					</div>
					<div class='footer-col'>
						<h4>follow us</h4>
						<div class='social-links'>
							<a href='#'>
								<i class='fab fa-telegram'></i>
							</a>
							<a href='#'>
								<i class='fab fa-instagram'></i>
							</a>
							<a href='#'>
								<i class='fab fa-linkedin-in'></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
