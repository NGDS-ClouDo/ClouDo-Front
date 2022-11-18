import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import TODOList from "./TODOList";
import AllCatForm from "./forms/AllCatForm";
import "./css/Category.css";
import UserNameForm from "./forms/UserNameForm";

const CategoryPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [paramString, setParamString] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [recordList, setTodoDataList] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/category/" +params.userID+"/"+
				params.categoryName +
				"/" +
				params.doneOrNot +
				"/" +
				(searchInput === "" ? " " : searchInput) +
				"/" +
				params.orderBy +
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
		setParamString(()=>"/"+(params.doneOrNot ===" "? "all": params.doneOrNot)+"/ /"+(params.orderBy ===" "? "recordCreatedDate": params.orderBy)+"/"+(params.desc ===" "? "asc": params.desc)+"/1");
		fetch("http://localhost:3001/record/category/", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				userID: params.userID,
				categoryName: params.categoryName,
				doneOrNot: params.doneOrNot,
				searchString: params.search,
				orderBy: params.orderBy, // 정렬 기준(날짜, 제목, 마감일? 등)
				desc: params.desc, // 오름차순 내림차순
				page: (params.page - 1), // 몇 번째 페이지 인지 => 1 페이지부터 시작, 10개가 1페이지
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((recordIn) =>
				setTodoDataList((prevState) => [
						...prevState,
						{
							userID: recordIn.userID,
							recordID: recordIn.recordID,
							recordName: recordIn.recordName,
							recordCreatedDate: recordIn.recordCreatedDate,
							recordDueDate: recordIn.recordDueDate,
							recordMemo: recordIn.recordMemo,
							recordDone: recordIn.recordDone
						},
					])
				);
				setLoading(false);
			});
	}, [params]);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<NavigationBar userID={params.userID}/>
			<h1><UserNameForm userID = {params.userID}/>의 TODO Lists</h1>
			<h2>category: {(params.categoryName)}</h2>
			<br></br>
			<h3>
				{"대상: " +
					(params.doneOrNot === "all"
						? "모든 작업"
						: params.doneOrNot === "done"
						? "완료된 작업"
						: params.doneOrNot === "undone"
						? "완료되지 않은 작업"
						: "")}
			</h3>
			<h3>
				{"정렬: " +
					(params.orderBy === "recordCreatedDate"
						? params.desc === "desc"
							? "등록일 나중순"
							: "등록일 최근순"
						: params.orderBy === "recordDueDate"
						? params.desc === "desc"
							? "마감일 나중순"
							: "마감일 최근순"
						: params.orderBy === "recordName"
						? params.desc === "desc"
							? "제목 내림차순"
							: "제목 오름차순"
						: params.orderBy === "recordID"
						? params.desc === "desc"
							? "기본 내림차순"
							: "기본 오름차순"
						: "")}
			</h3>
			<h4>order</h4>
			<Link
				to={
					"/category/"+params.userID+"/"+
					params.categoryName+
					"/"+
					params.doneOrNot+
					"/" +
					params.search +
					"/" +
					"recordID" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.orderBy === "recordID"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"기본 " +
						(params.orderBy === "recordID"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/category/"+params.userID+"/"+
					params.categoryName+
					"/"+
					+params.doneOrNot+"/" +
					params.search +
					"/" +
					"recordName" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.orderBy === "recordName"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"이름 \n" +
						(params.orderBy === "recordName"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/category/"+params.userID+"/"+
					params.categoryName+
					"/"+
					params.doneOrNot+"/" +
					params.search +
					"/" +
					"recordCreatedDate" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.orderBy === "recordCreatedDate"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"등록일 " +
						(params.orderBy === "recordCreatedDate"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/category/"+params.userID+"/"+
					params.categoryName+
					"/"+
					params.doneOrNot+"/" +
					params.search +
					"/" +
					"recordDueDate" +
					"/" +
					(params.desc === "desc" ? "asc/1" : "desc/1")
				}
			>
				<button
					className={
						params.orderBy === "recordDueDate"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"마감일 " +
						(params.orderBy === "recordDueDate"
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
						"/category/"+params.userID+"/"+
						params.categoryName+
						"/"+
						(params.doneOrNot === "all"
							? "undone"
							: params.doneOrNot === "undone"
							? "all"
							: "undone") +
						"/" +
						params.search +
						"/" +
						params.orderBy +
						"/" +
						params.desc+
						"/1"
					}
				>
					<button
						className={
							params.doneOrNot === "all"
								? "selectedOrderBtn"
								: params.doneOrNot === "done"
								? "selectedOrderBtn"
								: "unselectedOrderBtn"
						}
					>
						{"완료" +
							(params.doneOrNot === "all"
									? " 포함"
									: params.doneOrNot === "done"
									? " 포함"
									: " 미포함")}
					</button>
				</Link>
				<Link
					to={
						"/category/"+params.userID+"/"+
						params.categoryName+
						"/"+
						(params.doneOrNot === "all"
							? "done"
							: params.doneOrNot === "undone"
							? "done"
							: "all") +
						"/" +
						params.search +
						"/" +
						params.orderBy +
						"/" +
						params.desc+
						"/1"
					}
				>
					<button
						className={
							params.doneOrNot === "all"
								? "selectedOrderBtn"
								: params.doneOrNot === "undone"
								? "selectedOrderBtn"
								: "unselectedOrderBtn"
						}
					>
						{"미완료" +
							(params.doneOrNot === "all"
									? " 포함"
									: params.doneOrNot === "undone"
									? " 포함"
									: " 미포함")}
					</button>
				</Link>
			</div>
			<h4>All Categories</h4>
			<div>
				<AllCatForm params={paramString} userID={params.userID}/>
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
			<TODOList recordList={recordList} params={paramString} />
			<br></br>
			{page >= 2 ? (
				<Link
					to={
						"/category/"+params.userID+"/"+
						params.categoryName+
						"/"+params.doneOrNot+"/" +
						params.search +
						"/" +
						params.orderBy +
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
			{recordList.length >= 10 ? (
				<Link
					to={
						"/category/"+params.userID+"/"+
						params.categoryName+
						"/"+params.doneOrNot+"/" +
						params.search +
						"/" +
						params.orderBy +
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

export default CategoryPage;
