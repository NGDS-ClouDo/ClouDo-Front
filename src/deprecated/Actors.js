import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ActorList from "./ActorList";
import ActorProfileForm from "./forms/ActorProfileForm";
import NavigationBar from "./fragments/NavigationBar";

const Actors = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchQeury, setSearchQeury] = useState(
		params.search === "all"
			? ""
			: " and ak_name like '%" + params.search + "%'"
	);
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [desc, setDesc] = useState(true);
	const [actors, setactors] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/actors/" +
				(searchInput === "" ? "all" : searchInput) +
				"/" +
				params.order +
				"/" +
				params.desc +
				"/1"
		);
	};
	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			onClickSearch();
		}
	};
	useEffect(() => {
		setSearchQeury(
			params.search === "all"
				? " "
				: " and ak_name like '%" + params.search + "%'"
		);
		setactors([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query:
					"SELECT * FROM actor WHERE ak_name <> ''" +
					searchQeury +
					" order by " +
					params.order +
					" " +
					params.desc +
					" Limit " +
					10 * (params.page - 1) +
					", 10;",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((actor) =>
					setactors((prevState) => [
						...prevState,
						{
							aid: actor.aid,
							ak_name: actor.ak_name,
							ae_name: actor.ae_name,
							a_image: actor.a_image,
						},
					])
				);
				setLoading(false);
			});
	}, [params]);
	if (loading) return <div>새로고침 하세요</div>;
	return (
		<div>
			<NavigationBar />
			<h1>전체 배우 조회</h1>
			<Link
				to={
					"/actors/" +
					params.search +
					"/" +
					"aid" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button className="pageBtn">
					{"기본 " +
						(params.order === "aid"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/actors/" +
					params.search +
					"/" +
					"ak_name" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button className="pageBtn">
					{"이름 " +
						(params.order === "ak_name"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<div>
				<input
					type="text"
					name="message"
					placeholder="배우 검색"
					value={searchInput}
					onChange={onChangeSearchInput}
					onKeyPress={onKeyPress}
				/>
				<button onClick={onClickSearch}>검색</button>
			</div>
			<br></br>
			<ActorList actors={actors} />
			<br></br>
			{page >= 2 ? (
				<Link
					to={
						"/actors/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc +
						"/" +
						(page - 1)
					}
				>
					<button>이전 페이지</button>
				</Link>
			) : (
				"       "
			)}
			{actors.length >= 10 ? (
				<Link
					to={
						"/actors/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc +
						"/" +
						(page + 1)
					}
				>
					<button>다음 페이지</button>
				</Link>
			) : (
				""
			)}
		</div>
	);
};

export default Actors;
