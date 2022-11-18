import {useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import "./css/Home.css";
import { useState } from "react";
import moment from "moment";
import AllUserForm from "./forms/AllUserForm";

const Home = () => {
	const params = useParams();
	const [AddUser, setAddUser] = useState(false);
	const onClickAddUserBtn = () =>{setAddUser(!AddUser)};
	const TODOAdd = () => {
		const [uName, setUName] = useState("");
		const onChangeUName = (e) => setUName(e.target.value);
		const navigate = useNavigate();
		const onClickConfirm = () => {
			fetch("http://localhost:3001/NewUser", {
				method: "put", //통신방법
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					u_name:uName
				}),
			});
			window.location.reload()
			setAddUser(!AddUser);
		};
		return (
			<div className="addUserElement">
				<div>
					생성할 유저 이름 {"\t"}: {"\t"} 
						<input
							type="text"
							name="uName"
							placeholder={"유저 이름"}
							onChange={onChangeUName}
						/>
				</div>
				<br></br>
				<button onClick={onClickConfirm}>확인</button>
				<br></br>
			</div>
		);
	}
	return (
		<div className="home">
			<NavigationBar uid ={params.uid === undefined | params.uid === "" ? "0" : params.uid} />
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
			<h3>User List User 추가</h3>
			
			{AddUser ? <div><TODOAdd AddUser={AddUser}></TODOAdd><button onClick={onClickAddUserBtn}>취소</button></div>:<button onClick={onClickAddUserBtn}>추가</button>}
			<br></br>
			<AllUserForm />
		</div>
	);
};
export default Home;
