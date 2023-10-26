import React from 'react'
import Navbar from './Navbar'
import { Link} from "react-router-dom";

export default function AboutUs() {
	return (
		<div className='signin-page-container'>
			<Navbar
				navStyle={{
					height: "60px",
					// backgroundColor: "#01010177",
					position: "relative",
					top: 0,
					opacity: 1,
					zIndex: 2,
				}}
			/>
			<div className='abaut-main'>
				<div className='abaut-profiles'>
					<div className='profile'>
						<div
							className='userimage'
							style={{
								position: "relative",
								top: "0",
								left: "50px",
								scale: "1.5",
							}}
						></div>
						<h1>Rajan Makavana</h1>
						<h2>Portfolio</h2>
					</div>
					<div className='profile'>
						<div
							className='userimage'
							style={{
								position: "relative",
								top: "0",
								left: "45px",
								scale: "1.5",
							}}
						></div>
						<h1>Bharat Ladva</h1>
						<Link to={"https://bharatladva.github.io/cv/"}>
							<h2>Portfolio</h2>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

