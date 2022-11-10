import { Link } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import "./Home.css";

const Home = () => {
	return (
		<div className="home">
			<NavigationBar />
			<h1>차세대분산시스템 Term Project</h1>
			<h1>10조</h1>
			<p>
				<b>강성범: </b>.<br></br>
				<b>김주혜: </b>.<br></br>
				<b>이찬하: </b>프론트<br></br>
			</p>
			<p>
				<b>백엔드: </b> Spring<br></br>
				<b>프론트엔드: </b> React<br></br>
			</p>
		</div>
	);
};
export default Home;
