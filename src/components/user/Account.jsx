/** @format */

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	
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

	return (
		<div className='card'>
			<div className='card-body'>
				<h2 className='text-center mb-4'>Profile</h2>
				{error && <div className='alert'>{error}</div>}
				<strong>Email:</strong> {currentUser.email}
				<Link
					to='/update-profile'
					className='btn btn-primary w-100 mt-3'
				>
					Update Profile
				</Link>
			</div>
			<div className='w-100 text-center mt-2'>
				<button
					className='btn-link'
					onClick={handleLogout}
				>
					Log Out
				</button>
			</div>
		</div>
	);
}
