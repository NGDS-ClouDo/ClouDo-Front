import { Link,  useNavigate, useParams } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar({uid}) {
	return (
		<div className="navigationBar">
			<div>
				<Link to={"/home/"} className="nav_HomeBtn">
					Back To Home
				</Link>
			</div>
			<div>
				<Link to={"/TODOListPage/"+uid+"/all/ /t_created_date/asc/1/"} className="nav_TDLBtn">
					TODO List
				</Link>
			</div>
			<div>
				<Link to={"/category/"+uid+"/ /all/ /t_created_date/asc/1/"} className="nav_TDLBtn">
					Search by Category
				</Link>
			</div>
		</div>
	);
}

export default NavigationBar;
