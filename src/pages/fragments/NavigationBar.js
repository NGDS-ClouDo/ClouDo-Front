import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
	return (
		<div className="navigationBar">
			<div>
				<Link to="/home" className="nav_HomeBtn">
					홈으로
				</Link>
			</div>
			<div>
				<Link to="/TODOListPage/all/ /t_created_date/asc/1" className="nav_TDLBtn">
					TODO List
				</Link>
			</div>
			<div>
				<Link to="/category/ /all/ /t_created_date/asc/1" className="nav_TDLBtn">
					TODO List
				</Link>
			</div>
		</div>
	);
}

export default NavigationBar;
