/** @format */

import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";


export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
		const navigate = useNavigate();

	

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch (error) {
			console.error(error);
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				action=''
				id='a-form'
				className='signin-form'
			>
				<h2 className='form_title title'>Create Account</h2>
				
				<div className='error-aleart'>{error}</div>
				<span className='form__span'>use email for registration</span>
				<label className='label-text'>Name</label>

				<input
					type='text'
					className='form__input'
					placeholder='abc'
				/>
				<label className='label-text'>Email</label>
				<input
					type='email'
					className='form__input'
					placeholder='abc@gmail.com'
					ref={emailRef}
				/>
				<label className='label-text'>Password</label>
				<input
					type='password'
					className='form__input Password'
					placeholder='******'
					ref={passwordRef}
				/>
				<label className='label-text'>Password</label>
				<input
					type='password'
					className='form__input Password'
					placeholder='******'
					ref={passwordConfirmRef}
				/>
				<button
					className='form__button signin-button submit'
					disabled={loading}
					type='submit'
				>
					Sign Up
				</button>
			</form>
		</>
	);
}
