import React from 'react';
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBarHome({userID}) {
	return (
		<div className="navigationBar">
			<div>
				<Link to={"/home/"} className="nav_HomeBtn">
					HOME
				</Link>
			</div>
		</div>
	);
}

export default NavigationBarHome;
