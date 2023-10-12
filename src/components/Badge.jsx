import React from "react";
import { Link } from "react-router-dom";

export default function Badge(props) {

  const{ text, color ,index, id } = props
  const style = {
    color: color,
  };
  return (
		<Link
			to= {`/DiscoverPage/${id}`}
		>
			<div
				style={style}
				className='badge'
			>
				<span>{text}</span>
			</div>
		</Link>
	);
}
