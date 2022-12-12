import React, { useEffect, useState } from "react";
import { ADDRESS } from "../Address";

function UserNameForm({userID}) {
	const [loading, setLoading] = useState(true);
	const [userName, setUserName] = useState("");
	useEffect(() => {
		fetch(ADDRESS+"/user", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				userID:userID
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((userNameIn) =>
					setUserName(userNameIn.userName)
				);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (userName
	);
}
export default UserNameForm;
