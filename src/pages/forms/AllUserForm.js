import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AllUserFormElement({ user }) {
	return (
		<div
			style={{
				cursor: "pointer",
			}}
			className="users"
		>
			<Link to={"/TODOListPage/"+user.uid+"/all/ /t_created_date/asc/1/"}>
				<b>{user.u_name}</b>
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
		fetch("http://localhost:3001/user", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				tid: 0
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((user) =>
					setUsers((prevState) => [
						...prevState,
						{
							uid: user.uid,
							u_name: user.u_name,
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
