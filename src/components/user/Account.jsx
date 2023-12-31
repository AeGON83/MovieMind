/** @format */

import React, { useState } from "react";
import { useAuth } from "../user/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const favorites = "favorites";
  const Watchlist = "watchList";
  const Ratings = "ratings";

  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/signup");
    } catch {
      setError("Failed to log out");
    }
  }

  function navigateTofavorites() {
    navigate(`/user/${favorites}`);
  }
  function navigateToWatchList() {
    navigate(`/user/${Watchlist}`);
  }
  function navigateToRatings() {
    navigate(`/user/${Ratings}`);
  }

  return (
		<div className='signin-page-container'>
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
			<div className='signin-page-main'>
				<div>
					<h2 className='form_title title'>User Profile</h2>
					{error && <div className='alert'>{error}</div>}
					<p style={{ fontFamily: "Oswald , sans-serif", fontSize: "18px" }}>
						Email
					</p>
					<p
						className='account-email'
						style={{ fontSize: "15px" }}
					>
						{currentUser.email}
					</p>

					<div className='userimage'></div>
				</div>

				<div
					className='userdata'
					style={{
						display: "flex",
						justifyContent: "center",
						gap: "10%",
					}}
				>
					<div
						className='category-box'
						onClick={navigateTofavorites}
						style={{
							cursor: "pointer",
							display: "flex",
							justifyContent: "center",
							paddingTop: "30px",
							zIndex: "100",
						}}
					>
						<div>
							<div className='icon-button acc-heart-btn'></div>
							<label htmlFor=''>{favorites}</label>
						</div>
					</div>
					<div
						className='category-box'
						style={{
							cursor: "pointer",
							display: "flex",
							justifyContent: "center",
							paddingTop: "30px",
							zIndex: "100",
						}}
						onClick={navigateToWatchList}
					>
						<div>
							<div className='icon-button acc-bookmark-btn'></div>
							<label htmlFor=''>{Watchlist}</label>
						</div>
					</div>
					<div
						className='category-box'
						style={{
							cursor: "pointer",
							display: "flex",
							justifyContent: "center",
							paddingTop: "30px",
							zIndex: "100",
						}}
						onClick={navigateToRatings}
					>
						<div>
							<div className='icon-button rat-btn'></div>
							<label htmlFor=''>{Ratings}</label>
						</div>
					</div>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						gap: "20%",
						height: "100%",
						alignItems: "flex-end",
						position: "absolute",
						top: "-10%",
					}}
				>
					<Link to='/update-profile'>
						<button className='form__button signin-button'>
							Update Profile
						</button>
					</Link>

					<button
						className='form__button signin-button submit'
						onClick={handleLogout}
					>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}
