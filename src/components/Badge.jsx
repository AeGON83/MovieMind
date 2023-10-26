/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function Badge(props) {
	const { text, color, id } = props;
	const finalId = id !== undefined ? id : 28; // Set id to 28 if it is undefined
	const style = {
		color: color,
	};

	return (
		<Link to={`/DiscoverPage/${finalId}`}>
			<div
				style={style}
				className='badge'
			>
				<span>{text}</span>
			</div>
		</Link>
	);
}
