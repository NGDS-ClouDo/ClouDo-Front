import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AllCatFormElement({ category, params }) {
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="categories"
		>
			<Link to={"/category/" + category.category + params}>
				<b>{category.category}</b>
			</Link>
			&nbsp;
		</div>
	);
}

function AllCatForm({ params }) {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		setCategories([]);
		fetch("http://localhost:3001/category", {
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
				json.map((category) =>
					setCategories((prevState) => [
						...prevState,
						{
							category: category.category,
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
				<AllCatFormElement category={category} params={params}/>
			))}
		</div>
	);
}
export default AllCatForm;
