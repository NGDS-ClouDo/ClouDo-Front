import { Link,  useNavigate, useParams } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBarHome({uid}) {
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
