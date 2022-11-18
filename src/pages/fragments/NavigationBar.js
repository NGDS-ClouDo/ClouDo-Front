import React from 'react';
import { Link,  useNavigate, useParams } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar({userID}) {
	return (
		<div className="navigationBar">
			<div>
				<Link to={"/home/"} className="nav_HomeBtn">
					Back To Home
				</Link>
			</div>
			<div>
				<Link to={"/TODOListPage/"+userID+"/all/ /recordCreatedDate/asc/1/"} className="nav_TDLBtn">
					TODO List
				</Link>
			</div>
			<div>
				<Link to={"/category/"+userID+"/ /all/ /recordCreatedDate/asc/1/"} className="nav_TDLBtn">
					Search by Category
				</Link>
			</div>
		</div>
	);
}

export default NavigationBar;
