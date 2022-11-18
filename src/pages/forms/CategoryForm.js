import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function CategoryFormElement({ category, uid, params }) {
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="categories"
		>
			<Link to={"/category/" +uid+"/"+ category.category + params}>
				<b>{category.category}</b>
			</Link>
			&nbsp;
		</div>
	);
}

function CategoryForm({ tid, uid, params }) {
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
				uid: uid,
				tid: tid
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
				<CategoryFormElement category={category} uid={uid} params={params}/>
			))}
		</div>
	);
}
export default CategoryForm;
