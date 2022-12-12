import React from 'react';
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./forms/CategoryForm";
import "./css/TODOList.css";
import {ADDRESS} from "./Address"

const TODOListElement = ({ record, paramString }) => {
	const [tEdit, setTEdit] = useState(false);
	const [recordNameInput, setRecordNameInput] = useState(record.recordName);
	const navigate = useNavigate();
	const onChangeTName = (e) => setRecordNameInput(e.target.value);
	const [recordDueDateInput, setRecordDueDateInput] = useState(record.recordDueDate);
	const [categoryNameInput, setCategoryNameInput] = useState("");
	const onChangeCategoryNameInput = (e) => setCategoryNameInput(e.target.value);
	const onClickCategoryNameInputConfirm = () => {
		categoryNameInput !=="" ?
		fetch(ADDRESS+"/category/add/", {
		method: "post", //통신방법
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			recordID: record.recordID,
			userID: record.userID,
			categoryName: categoryNameInput
		}),}) 
		: setCategoryNameInput("");
	setCategoryEdit(false)};
	const onChangeTDueDateD = (e) => {
		setRecordDueDateInput(e.target.value+" "+
		moment(recordDueDateInput).format(
			"HH:mm:00"
		));};
	const onChangeTDueDateT = (e) => {
		setRecordDueDateInput(moment(recordDueDateInput).format(
			"YYYY-MM-DD"
		)+" "+e.target.value);};
	const [recordDoneInput, setRecordDoneInput] = useState(record.recordDone);
	const [recordMemoInput, setRecordMemoInput] = useState(record.recordMemo);
	const [categoryEdit, setCategoryEdit] = useState(false);
	const onChangeRecordMemoInput = (e) => setRecordMemoInput(e.target.value);
	const onClickCatEdit = () => setCategoryEdit(!categoryEdit);


	const onClickEditConfirm = () => {
		fetch(ADDRESS+"/record/edit/", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				recordID: record.recordID,
				userID: record.userID,
				recordName: recordNameInput,
				recordDueDate: recordDueDateInput,
				recordDone: recordDoneInput,
				recordMemo: recordMemoInput
			}),
		});
		navigate(
			"/TODOListPage/"+record.userID+paramString
		);
	};
	const onClickRemoveRecord = () => {
		fetch(ADDRESS+"/record/remove/", {
			method: "delete", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				recordID: record.recordID,
				userID: record.userID,
			}),
		});
		navigate(
			"/TODOListPage/"+record.userID+paramString
		);
	};
	const onClickBack = () => {
		navigate(
			"/TODOListPage/"+record.userID+paramString
		);
	};
	const onClickEdit = () => {
		setTEdit(!tEdit)
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
						{tEdit ?  
							<input
								type="text"
								name="recordNameInput"
								placeholder={recordNameInput}
								value={recordNameInput}
								onChange={onChangeTName}
							/> :
							record.recordName}
					</div>
					
					<br></br>
					<div>
						카테고리 {"\t"}: {"\t"}
						{
							categoryEdit? 
							<div>
								<input
									type="text"
									name="categoryNameInput"
									placeholder={"추가할 카테고리 입력"}
									onChange={onChangeCategoryNameInput}
								/>
								<button
									onClick={onClickCategoryNameInputConfirm}>추가</button>

								<div>
									<CategoryForm recordID={record.recordID} userID = {record.userID} params={paramString} del={false}  ></CategoryForm>
								</div>:
							</div>:
							<div>
								<CategoryForm recordID={record.recordID} userID = {record.userID} params={paramString} del={true} ></CategoryForm>
								<button
									onClick={onClickCatEdit}>
										카테고리 수정
								</button>
							</div>
							
						}
					</div>
					<br></br>
					<br></br>
					<div>
						작성일 {"\t"}: {"\t"}
						{moment(record.recordCreatedDate).format(
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
								name="recordNameInput"
								value={moment(recordDueDateInput).format(
									"YYYY-MM-DD"
								)}
								onChange={onChangeTDueDateD}
							/>
							<input
								type="time"
								name="recordNameInput"
								value={moment(recordDueDateInput).format(
									"HH:mm:00"
								)}
								onChange={onChangeTDueDateT}
							/> 
							{recordDueDateInput}
						</div>:
							moment(record.recordDueDate).format(
								"YYYY년 MM월 DD일 HH시 mm분"
							)}
					</div>
					<br></br>
					<div>
						완료 여부 {"\t"}: {"\t"} 
						{tEdit ? 
				<button
					className={
						recordDoneInput === "1"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
					onClick = {onClickDone}
				>
					{(recordDoneInput === "1" ? "완료" : "미완")}
				</button>:
							record.recordDone }
					</div>
					<br></br>
					<div className="memo">
						<h2>내용</h2>
						{tEdit ? 
							<input
								type="text"
								name="recordMemoInput"
								placeholder={recordMemoInput}
								value={recordMemoInput}
								onChange={onChangeRecordMemoInput}
							/>:
							record.recordMemo }
					</div>
				</div>
			</div>{ tEdit ? <div>
				<br></br>
				<button onClick={onClickEditConfirm}>확인</button>
				<br></br>
				<button onClick={onClickRemoveRecord}>삭제</button>
				<br></br>
				<button onClick={onClickBack}>취소</button>
				<br></br> </div>: 
				<button onClick={onClickEdit}>수정</button>}
		</div>
	);
}

function TODOList({ recordList, params }) {
	return (
		<div>
			{recordList.map((record) => (
				<TODOListElement record={record} paramString={params} />
			))}
		</div>
	);
}

export default TODOList;
