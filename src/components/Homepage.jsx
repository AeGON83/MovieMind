/** @format */

import React from "react";
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"
import CategoryBar from "./CategoryBar"



export default function () {
	return (
		<>
			<div className='homepage-first-screen'>
			
				<Navbar />
				<SearchBar />
				<CategoryBar />
				{/* <Account/> */}
			</div>
		</>
	);
}
