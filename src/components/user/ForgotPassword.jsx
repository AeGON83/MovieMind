/** @format */

import React, { useRef, useState } from "react";
import { useAuth } from "../user/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to reset password");
		}

		setLoading(false);
	}

	return (
		<>
			<div className='card'>
				<div className='card-body'>
					<h2 className='text-center mb-4'>Password Reset</h2>
					{error && <div className='alert alert-danger'>{error}</div>}
					{message && <div className='alert alert-success'>{message}</div>}
					<form onSubmit={handleSubmit}>
						<div
							className='form-group'
							id='email'
						>
							<label>Email</label>
							<input
								type='email'
								ref={emailRef}
								required
								className='form-control'
							/>
						</div>
						<button
							disabled={loading}
							className='btn btn-primary w-100'
							type='submit'
						>
							Reset Password
						</button>
					</form>
					<div className='w-100 text-center mt-3'>
						<Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</>
	);
}
