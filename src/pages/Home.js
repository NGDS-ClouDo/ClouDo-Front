import React from 'react'
import {useParams } from "react-router-dom";
import "./css/Home.css";
import { useState } from "react";
import AllUserForm from "./forms/AllUserForm";
import NavigationBarHome from "./fragments/NavigationBarHome";
import { ADDRESS } from './Address';

const Home = () => {
	const params = useParams();
	const [AddUser, setAddUser] = useState(false);
	const onClickAddUserBtn = () =>{setAddUser(!AddUser)};
	const TODOAdd = () => {
		const [uName, setUName] = useState("");
		const onChangeUName = (e) => setUName(e.target.value);
		const onClickConfirm = () => {
			fetch(ADDRESS+"/user/add/", {
				method: "post", //통신방법
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					userName:uName
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
		<div>
			<NavigationBarHome userID ={params.userID === undefined | params.userID === "" ? "0" : params.userID} />
			<div className="home">
				<h1>Welcome to ClouDo</h1>
				<h3>10조 강성범 김주혜 이찬하</h3>
				<p>
					<b>프론트엔드: </b> React, Nodejs<br></br>
					<b>백엔드: </b> Spring<br></br>
				</p>
				<h3>User List User 추가</h3>
				{params.userID === undefined | params.userID === "" ? "0" : params.userID}
				{AddUser ? <div><TODOAdd AddUser={AddUser}></TODOAdd><button onClick={onClickAddUserBtn}>취소</button></div>:<button onClick={onClickAddUserBtn}>추가</button>}
				<br></br>
				<AllUserForm className="userNameForm"/>
			</div>
		</div>
	);
};
export default Home;
