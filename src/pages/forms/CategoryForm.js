import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ADDRESS } from "../Address";
function CategoryFormElement({ category, userID, params }) {
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="singleCategory"
		>
			<Link to={"/category/" +userID+"/"+ category.categoryName + params}>
				<b>{category.categoryName}</b>
			</Link>
			&nbsp;
		</div>
	);
}

function CategoryForm({ recordID, userID, params, del }) {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const onClickDelCat = (categoryN, e)=>{
		fetch(ADDRESS+"/category/remove", {
				method: "delete", //통신방법
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					recordID: recordID,
					categoryName: categoryN
				}),
		});
		console.log(categoryN);
		setCategories(categories.filter((data) => {
            return data.categoryName !== categoryN
        }))
	}
	useEffect(() => {
		setCategories([]);
		fetch(ADDRESS+"/category", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				userID: userID,
				recordID: recordID
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((categoryIn) =>
					setCategories((prevState) => [
						...prevState,
						{
							categoryName: categoryIn.categoryName,
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
				<CategoryFormElement category={category} userID={userID} params={params}/>
			)) : 
			categories.map((category)=>(
					<div>
						{category.categoryName}<button onClick={(e)=>onClickDelCat(category.categoryName, e)}>삭제</button>
					</div>
				))
			}
		</div>
	);
}
export default CategoryForm;
