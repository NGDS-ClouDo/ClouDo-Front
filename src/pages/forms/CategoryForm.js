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

function CategoryForm({ tid, uid, params, del }) {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [catName, setCatName] = useState("");
	const onClickDelCat = (catName, e)=>{
		fetch("http://localhost:3001/category", {
				method: "delete", //통신방법
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					tid: tid,
					category: catName
				}),
		});
		console.log(catName);
		setCategories(categories.filter((data) => {
            return data.category !== catName
        }))
	}
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
			{del?
			categories.map((category) => (
				<CategoryFormElement category={category} uid={uid} params={params}/>
			)) : 
			categories.map((category)=>(
					<div>
						{category.category}<button onClick={(e)=>onClickDelCat(category.category, e)}>삭제</button>
					</div>
				))
			}
		</div>
	);
}
export default CategoryForm;
