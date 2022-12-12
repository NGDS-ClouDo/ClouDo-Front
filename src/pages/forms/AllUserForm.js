import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ADDRESS } from "../Address";
function AllUserFormElement({ user }) {
	return (
		<div
			style={{
				cursor: "pointer",
			}}
			className="users"
		>
			<Link to={"/TODOListPage/"+user.userID+"/all/ /recordCreatedDate/asc/1/"}>
				<b>{user.userName}</b>
			</Link>
			&nbsp;
		</div>
	);
}

function AllUserForm() {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		setUsers([]);
		fetch(ADDRESS+"/user/all", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((userIn) =>
					setUsers((prevState) => [
						...prevState,
						{
							userID: userIn.userID,
							userName: userIn.userName,
						},
					])
				);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<h3>Users</h3>
			{users.map((user) => (
				<AllUserFormElement user={user}/>
			))}
		</div>
	);
}
export default AllUserForm;
