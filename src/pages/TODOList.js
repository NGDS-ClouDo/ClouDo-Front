import moment from "moment";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryForm from "./forms/CategoryForm";
import "./TODOList.css";

const TODOListElement = ({ todoData, paramString }) => {
	const [tEdit, setTEdit] = useState(false);
	const [tName, setTName] = useState(todoData.t_name);
	const navigate = useNavigate();
	const onChangeTName = (e) => setTName(e.target.value);
	const [tDueDate, setTDueDate] = useState(todoData.t_due_date);
	const onChangeTDueDateD = (e) => {
		setTDueDate(e.target.value+" "+
		moment(tDueDate).format(
			"HH:mm:00"
		));};
	const onChangeTDueDateT = (e) => {
		setTDueDate(moment(tDueDate).format(
			"YYYY-MM-DD"
		)+" "+e.target.value);};
	const [tDone, setTDone] = useState(todoData.t_done);
	const [tMemo, setTMemo] = useState(todoData.t_memo);
	const onChangeTMemo = (e) => setTMemo(e.target.value);
	const onClickConfirm = () => {
		fetch("http://localhost:3001/ToDoEdit", {
			method: "put", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				tid: todoData.tid,
				t_name: tName,
				t_created_date: todoData.t_created_date,
				t_due_date: tDueDate,
				t_done: tDone,
				t_memo: tMemo
			}),
		});
		navigate(
			"/TODOListPage"+paramString
		);
	};
	const onClickDelete = () => {
		fetch("http://localhost:3001/ToDoEdit", {
			method: "delete", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				tid: todoData.tid,
			}),
		});
		navigate(
			"/TODOListPage"+paramString
		);
	};
	const onClickBack = () => {
		navigate(
			"/TODOListPage"+paramString
		);
	};
	const onClickEdit = () => {
		setTEdit(!tEdit)
	};
	const onClickDone = () => {
		tDone ==="1" ? setTDone("0"):setTDone("1")
	};
	return (
		<div className="todoElement">
			<div className="todoInfo">
				<div className="todoBasicInfo">
					{/* <Link to={"/profiles/" + todoData.tid} className="todoDataTitle">
						{todoData.t_name}
					</Link> */}
					<div>
						제목 {"\t"}: {"\t"} 
						{tEdit ?  
							<input
								type="text"
								name="tName"
								placeholder={tName}
								value={tName}
								onChange={onChangeTName}
							/> :
							todoData.t_name}
					</div>
					
					<br></br>
					<div>
						카테고리 {"\t"}: {"\t"}
						<CategoryForm tid={todoData.tid} params={paramString}></CategoryForm>
					</div>
					<br></br>
					<br></br>
					<div>
						작성일 {"\t"}: {"\t"}
						{moment(todoData.t_created_date).format(
							"YYYY년 MM월 DD일 HH시 mm분"
						)}
					</div>
					<br></br>
					<div>
						마감일 {"\t"}: {"\t"}
						{tEdit ?
						<div>
							<input
								type="date"
								name="tName"
								value={moment(tDueDate).format(
									"YYYY-MM-DD"
								)}
								onChange={onChangeTDueDateD}
							/>
							<input
								type="time"
								name="tName"
								value={moment(tDueDate).format(
									"HH:mm:00"
								)}
								onChange={onChangeTDueDateT}
							/> 
							{tDueDate}
						</div>:
							moment(todoData.t_due_date).format(
								"YYYY년 MM월 DD일 HH시 mm분"
							)}
					</div>
					<br></br>
					<div>
						완료 여부 {"\t"}: {"\t"} 
						{tEdit ? 
				<button
					className={
						tDone === "1"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
					onClick = {onClickDone}
				>
					{(tDone === "1" ? "완료" : "미완")}
				</button>:
							todoData.t_done }
					</div>
					<br></br>
					<div className="memo">
						<h2>내용</h2>
						{tEdit ? 
							<input
								type="text"
								name="tMemo"
								placeholder={tMemo}
								value={tMemo}
								onChange={onChangeTMemo}
							/>:
							todoData.t_memo }
					</div>
				</div>
			</div>{ tEdit ? <div>
				<br></br>
				<button onClick={onClickConfirm}>확인</button>
				<br></br>
				<button onClick={onClickDelete}>삭제</button>
				<br></br>
				<button onClick={onClickBack}>취소</button>
				<br></br> </div>: 
				<button onClick={onClickEdit}>수정</button>}
		</div>
	);
}

function TODOList({ todoDataList, params }) {
	return (
		<div>
			{todoDataList.map((todoData) => (
				<TODOListElement todoData={todoData} paramString={params} />
			))}
		</div>
	);
}

export default TODOList;
