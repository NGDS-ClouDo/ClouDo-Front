import React from 'react';
import { useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import TODOList from "./TODOList";
import "./css/TODOListPage.css";import "./css/TODOList.css";
import moment from "moment";
import UserNameForm from "./forms/UserNameForm";
import {ADDRESS} from "./Address"



const TODOListPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [AddRecord, setAddRecord] = useState(false);
	const onClickAddRecordBtn = () =>{setAddRecord(!AddRecord)};
	const [searchInput, setSearchInput] = useState("");
	const [paramString, setParamString] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [recordList, setRecordList] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);


	const RecordAddComponent = ({paramString}) => {
		const [recordNameInput, setRecordNameInput] = useState("");
		const onChangeRecordName = (e) => setRecordNameInput(e.target.value);
		const navigate = useNavigate();
		const [recordDueDateInput, setRecordDueDateInput] = useState("2022-12-05 00:00:00");
		const onChangeRecordDueDateInputDate = (e) => {
			setRecordDueDateInput(e.target.value+" "+
			moment(recordDueDateInput).format(
				"HH:mm:00"
			));};
		const onChangeRecordDueDateInputHour = (e) => {
			setRecordDueDateInput(moment(recordDueDateInput).format(
				"YYYY-MM-DD"
			)+" "+e.target.value);};
		const [recordDoneInput, setRecordDoneInput] = useState("0");
		const [recordMemoInput, setRecordMemoInput] = useState("");
		const onChangeRecordMemoInput = (e) => setRecordMemoInput(e.target.value);
		const onClickRecordAddConfirm = () => {
			fetch(ADDRESS+"/record/add/", {
				method: "post", //통신방법
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					userID: params.userID,
					recordName: recordNameInput,
					recordDueDate: recordDueDateInput,
					recordDone: recordDoneInput,
					recordMemo: recordMemoInput,
				}),
			});
			navigate(
				"/TODOListPage/"+params.userID+paramString
			);
			setAddRecord(!AddRecord);
		};
		const onClickDone = () => {
			recordDoneInput ==="1" ? setRecordDoneInput("0"):setRecordDoneInput("1")
		};
		return (
			<div className="todoElement">
				<div className="todoInfo">
					<div className="todoBasicInfo">
						{/* <Link to={"/profiles/" + record.recordID} className="recordTitle">
							{record.recordName}
						</Link> */}
						<div>
							제목 {"\t"}: {"\t"} 
								<input
									type="text"
									name="recordNameInput"
									placeholder={"필수"}
									onChange={onChangeRecordName}
								/>
						</div>
						
						<br></br>
						<br></br>
						<br></br>
						<div>
							마감일 {"\t"}: {"\t"}
							<div>
								<input
									type="date"
									name="recordNameInput"
									value={moment(recordDueDateInput).format(
										"YYYY-MM-DD"
									)}
									onChange={onChangeRecordDueDateInputDate}
								/>
								<input
									type="time"
									name="recordNameInput"
									value={moment(recordDueDateInput).format(
										"HH:mm:00"
									)}
									onChange={onChangeRecordDueDateInputHour}
								/> 
								{recordDueDateInput}
							</div>
						</div>
						<br></br>
						<div>
							완료 여부 {"\t"}: {"\t"} 
					<button
						className={
							recordDoneInput === "1"
								? "selectedOrderBtn"
								: "unselectedOrderBtn"
						}
						onClick = {onClickDone}
					>
						{(recordDoneInput === "1" ? "완료" : "미완")}
					</button>
						</div>
						<br></br>
						<div className="memo">
							<h2>내용</h2>
								<input
									type="text"
									name="recordMemoInput"
									placeholder={recordMemoInput}
									value={recordMemoInput}
									onChange={onChangeRecordMemoInput}
								/>
						</div>
					</div>
				</div>
					<br></br>
					<button onClick={onClickRecordAddConfirm}>확인</button>
					<br></br>
			</div>
		);
	}
	const onClickSearch = () => {
		navigate(
			"/TODOListPage/"+params.userID+"/"+params.doneOrNot+"/" +
				(searchInput === "" ? " " : searchInput) +
				"/" +
				params.orderBy +
				"/" +
				params.desc +
				"/1/"
		);
	};
	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			onClickSearch();
		}
	};
	useEffect(() => {
		setRecordList([]);
		setParamString(()=>"/"+(params.doneOrNot ===" "? "all": params.doneOrNot)+"/ /"+(params.orderBy ===" "? "recordCreatedDate": params.orderBy)+"/"+(params.desc ===" "? "asc": params.desc)+"/1/");
		fetch(ADDRESS+"/record", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				userID: params.userID,
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
				setRecordList((prevState) => [
						...prevState,
						{
							recordID: recordIn.recordID,
							userID: recordIn.userID,
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
	if (loading) return <div>새로고침 하세요</div>;
	return (
		<div className='todopage' >
			<NavigationBar userID = {params.userID}/>
			<div className='todolistpage'>
				<h1 className='username'><UserNameForm  userID = {params.userID}/>의 TODO Lists</h1>
				{/* <br></br>
				<div>
					{"대상: " +
						(params.doneOrNot === "all"
							? "모든 작업"
							: params.doneOrNot === "done"
							? "완료된 작업"
							: params.doneOrNot === "undone"
							? "완료되지 않은 작업"
							: "")}
				</div>
				<div>
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
							: "")}
				</div> */}
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
				<h4 >정렬 순서</h4>
				<Link
					to={
						"/TODOListPage/"+params.userID+"/"+params.doneOrNot+"/" +
						params.search +
						"/" +
						"recordName" +
						"/" +
						(params.desc === "desc" ? "asc/1" : "desc/1/")
					}
				>
					<button
						className={
							params.orderBy === "recordName"
								? "selectedOrderBtn"
								: "unselectedOrderBtn"
						}
					>
						{"제목 \n" +
							(params.orderBy === "recordName"
								? params.desc === "desc"
									? " ↓"
									: " ↑"
								: "")}
					</button>
				</Link>
				<Link
					to={
						"/TODOListPage/"+params.userID+"/"+params.doneOrNot+"/" +
						params.search +
						"/" +
						"recordCreatedDate" +
						"/" +
						(params.desc === "desc" ? "asc/1" : "desc/1/")
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
						"/TODOListPage/"+params.userID+"/"+params.doneOrNot+"/" +
						params.search +
						"/" +
						"recordDueDate" +
						"/" +
						(params.desc === "desc" ? "asc/1" : "desc/1/")
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
				<h4>완료 여부</h4>
				<div>
					<Link
						to={
							"/TODOListPage/"+params.userID+"/"+
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
							"/1/"
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
							"/TODOListPage/"+params.userID+"/"+
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
							"/1/"
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
				
				<h3>ToDo List 추가{AddRecord ? <div><RecordAddComponent paramString={paramString}></RecordAddComponent><button onClick={onClickAddRecordBtn}>취소</button></div>:<button onClick={onClickAddRecordBtn}>추가</button>}</h3>
				
				
			</div>
				<br></br>
				<TODOList recordList={recordList} params={paramString} />
				<br></br>
				{page >= 2 ? (
					<Link
						to={
							"/TODOListPage/"+params.userID+"/"+params.doneOrNot+"/" +
							params.search +
							"/" +
							params.orderBy +
							"/" +
							params.desc +
							"/" +
							(page - 1)+"/"
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
							"/TODOListPage/"+params.userID+"/"+params.doneOrNot+"/" +
							params.search +
							"/" +
							params.orderBy +
							"/" +
							params.desc +
							"/" +
							(page + 1)+"/"
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

export default TODOListPage;
