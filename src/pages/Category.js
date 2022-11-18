import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import TODOList from "./TODOList";
import AllCatForm from "./forms/AllCatForm";
import "./css/Category.css";

const Category = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [paramString, setParamString] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [todoDataList, setTodoDataList] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/category/" +params.uid+"/"+
				params.category +
				"/" +
				params.range +
				"/" +
				(searchInput === "" ? " " : searchInput) +
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
		setTodoDataList([]);
		setParamString(()=>"/"+(params.range ===" "? "all": params.range)+"/ /"+(params.order ===" "? "t_created_date": params.order)+"/"+(params.desc ===" "? "asc": params.desc)+"/1");
		fetch("http://localhost:3001/cats", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				uid: params.uid,
				category: params.category,
				range: params.range,
				search_string: params.search,
				order_by: params.order, // 정렬 기준(날짜, 제목, 마감일? 등)
				order: params.desc, // 오름차순 내림차순
				page: (params.page - 1), // 몇 번째 페이지 인지 => 1 페이지부터 시작, 10개가 1페이지
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((todoD) =>
				setTodoDataList((prevState) => [
						...prevState,
						{
							uid: todoD.uid,
							tid: todoD.tid,
							t_name: todoD.t_name,
							t_created_date: todoD.t_created_date,
							t_due_date: todoD.t_due_date,
							t_memo: todoD.t_memo,
							t_done: todoD.t_done
						},
					])
				);
				setLoading(false);
			});
	}, [params]);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<NavigationBar uid={params.uid}/>
			<h1>TODO Lists</h1>
			<h2>category: {(params.category)}</h2>
			<br></br>
			<h3>
				{"대상: " +
					(params.range === "all"
						? "모든 작업"
						: params.range === "done"
						? "완료된 작업"
						: params.range === "undone"
						? "완료되지 않은 작업"
						: "")}
			</h3>
			<h3>
				{"정렬: " +
					(params.order === "t_created_date"
						? params.desc === "desc"
							? "등록일 나중순"
							: "등록일 최근순"
						: params.order === "t_due_date"
						? params.desc === "desc"
							? "마감일 나중순"
							: "마감일 최근순"
						: params.order === "t_name"
						? params.desc === "desc"
							? "제목 내림차순"
							: "제목 오름차순"
						: params.order === "tid"
						? params.desc === "desc"
							? "기본 내림차순"
							: "기본 오름차순"
						: "")}
			</h3>
			<h4>order</h4>
			<Link
				to={
					"/category/"+params.uid+"/"+
					params.category+
					"/"+
					params.range+
					"/" +
					params.search +
					"/" +
					"tid" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "tid"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"기본 " +
						(params.order === "tid"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/category/"+params.uid+"/"+
					params.category+
					"/"+
					+params.range+"/" +
					params.search +
					"/" +
					"t_name" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "t_name"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"이름 \n" +
						(params.order === "t_name"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/category/"+params.uid+"/"+
					params.category+
					"/"+
					params.range+"/" +
					params.search +
					"/" +
					"t_created_date" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "t_created_date"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"등록일 " +
						(params.order === "t_created_date"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/category/"+params.uid+"/"+
					params.category+
					"/"+
					params.range+"/" +
					params.search +
					"/" +
					"t_due_date" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "t_due_date"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"마감일 " +
						(params.order === "t_due_date"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<h4>range</h4>
			<div>
				<Link
					to={
						"/category/"+params.uid+"/"+
						params.category+
						"/"+
						(params.range === "all"
							? "undone"
							: params.range === "undone"
							? "all"
							: "undone") +
						"/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc+
						"/1"
					}
				>
					<button
						className={
							params.range === "all"
								? "selectedOrderBtn"
								: params.range === "done"
								? "selectedOrderBtn"
								: "unselectedOrderBtn"
						}
					>
						{"완료" +
							(params.range === "all"
									? " 포함"
									: params.range === "done"
									? " 포함"
									: " 미포함")}
					</button>
				</Link>
				<Link
					to={
						"/category/"+params.uid+"/"+
						params.category+
						"/"+
						(params.range === "all"
							? "done"
							: params.range === "undone"
							? "done"
							: "all") +
						"/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc+
						"/1"
					}
				>
					<button
						className={
							params.range === "all"
								? "selectedOrderBtn"
								: params.range === "undone"
								? "selectedOrderBtn"
								: "unselectedOrderBtn"
						}
					>
						{"미완료" +
							(params.range === "all"
									? " 포함"
									: params.range === "undone"
									? " 포함"
									: " 미포함")}
					</button>
				</Link>
			</div>
			<h4>All Categories</h4>
			<div>
				<AllCatForm params={paramString} uid={params.uid}/>
			</div>
			<h4>search</h4>
			<div>
				<input
					type="text"
					name="message"
					placeholder="검색할 내용 또는 제목"
					value={searchInput}
					onChange={onChangeSearchInput}
					onKeyPress={onKeyPress}
				/>
				<button onClick={onClickSearch}>검색</button>
			</div>
			<br></br>
			<TODOList todoDataList={todoDataList} params={paramString} />
			<br></br>
			{page >= 2 ? (
				<Link
					to={
						"/category/"+params.uid+"/"+
						params.category+
						"/"+params.range+"/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc +
						"/" +
						(page - 1)
					}
				>
					<button className="pageBtn">이전 페이지</button>
				</Link>
			) : (
				"       "
			)}
			{todoDataList.length >= 10 ? (
				<Link
					to={
						"/category/"+params.uid+"/"+
						params.category+
						"/"+params.range+"/" +
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

export default Category;
