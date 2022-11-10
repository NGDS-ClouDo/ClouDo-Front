import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import CategoryForm from "./forms/CategoryForm";
import "./TODOList.css";

function TODOListElement({ todoData, params }) {
	return (
		<div className="todoElement">
			<div className="todoInfo">
				<div className="todoBasicInfo">
					{/* <Link to={"/profiles/" + todoData.tid} className="todoDataTitle">
						{todoData.t_name}
					</Link> */}
					
					<br></br>
					<div>
						카테고리 {"\t"}: {"\t"}
						<CategoryForm tid={todoData.tid} params={params}></CategoryForm>
					</div>
					<br></br>
					<br></br>
					<div>
						작성일 {"\t"}: {"\t"}
						{moment(todoData.t_created_date).format(
							"YYYY년 MM월 DD일"
						)}
					</div>
					<br></br>
					<div>
						마감일 {"\t"}: {"\t"}
						{moment(todoData.t_due_date).format(
							"YYYY년 MM월 DD일"
						)}
					</div>
					<br></br>
					<div>
						완료 여부 {"\t"}: {"\t"}
						{todoData.t_done}
					</div>
					<br></br>
					<div className="memo">
						<h2>내용</h2>
						<p>{todoData.t_memo}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function TODOList({ todoDataList, params }) {
	return (
		<div>
			{todoDataList.map((todoData) => (
				<TODOListElement todoData={todoData} params={params} />
			))}
		</div>
	);
}

export default TODOList;
