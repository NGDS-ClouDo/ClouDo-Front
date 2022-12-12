import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ADDRESS } from "../Address";
function AllCatFormElement({ category, userID,params }) {
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="categories"
		>
			<Link to={"/category/"  +userID+"/"+ category.categoryName + params}>
				<b>{category.categoryName}</b>
			</Link>
			&nbsp;
		</div>
	);
}

function AllCatForm({ params, userID }) {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		setCategories([]);
		fetch(ADDRESS+"/category/all/", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				userID: userID,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((category) =>
					setCategories((prevState) => [
						...prevState,
						{
							categoryName: category.categoryName,
						},
					])
				);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			{categories.map((category) => (
				<AllCatFormElement category={category} userID={userID} params={params}/>
			))}
		</div>
	);
}
export default AllCatForm;
