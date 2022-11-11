import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const TodoEdit = ({ todoEdit, paramString }) => {
	const [tName, setTName] = useState(todoEdit.t_name);
	const navigate = useNavigate();
	const onChangeTName = (e) => setTName(e.target.value);
	const [tDueDate, setTDueDate] = useState(todoEdit.t_due_date);
	const onChangeTDueDate = (e) => setTDueDate(e.target.value);
	const [tDone, setTDone] = useState(todoEdit.t_done);
	const onChangeTDone = (e) => setTDone(e.target.value);
	const [tMemo, setTMemo] = useState(todoEdit.t_memo);
	const onChangeTMemo = (e) => setTMemo(e.target.value);
	const onClickConfirm = () => {
		fetch("http://localhost:3001/ToDoEdit", {
			method: "put", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				t_tid: todoEdit.tid,
				t_name: tName,
				t_created_date: todoEdit.t_created_date,
				t_due_date: tDueDate,
				t_done: tDone,
				t_memo: tMemo
			}),
		});
		navigate(
			"/TODOListPage/"+paramString
		);
	};
	const onClickDelete = () => {
		fetch("http://localhost:3001/ToDoEdit", {
			method: "delete", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				t_tid: todoEdit.tid,
			}),
		});
		navigate(
			"/TODOListPage/"+paramString
		);
	};
	const onClickBack = () => {
		navigate(
			"/TODOListPage/"+paramString
		);
	};
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="todoEdit"
		>
			<div className="todoEditForm">
				<input
					type="text"
					name="message"
					placeholder={tName}
					value={tName}
					onChange={onChangeTName}
				/>
				<br></br>
				<input
					type="text"
					name="tDueDate"
					placeholder={tDueDate}
					value={tDueDate}
					onChange={onChangeTDueDate}
				/>
				<br></br>
				<input
					type="text"
					name="tDone"
					placeholder={tDone}
					value={tDone}
					onChange={onChangeTDone}
				/>
				<br></br>
				<input
					type="text"
					name="tMemo"
					placeholder={tMemo}
					value={tMemo}
					onChange={onChangeTMemo}
				/>
				<br></br>
				<button onClick={onClickConfirm}>확인</button>
				<br></br>
				<button onClick={onClickDelete}>삭제</button>
				<br></br>
				<button onClick={onClickBack}>취소</button>
				<br></br>
			</div>
		</div>
	);
}

function TodoEditForm({ tid, paramString }) {
	const [loading, setLoading] = useState(true);
	const [todoEdits, setTodoEdits] = useState([]);
	useEffect(() => {
		setTodoEdits([]);
		fetch("http://localhost:3001/todoEdit", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				tid: tid
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((todoEdit) =>
					setTodoEdits((prevState) => [
						...prevState,
						{
							tid: todoEdit.tid,
							t_name: todoEdit.dk_name,
							t_created_date: todoEdit.t_created_date,
							t_due_date: todoEdit.t_due_date,
							t_memo: todoEdit.t_memo
						},
					])
				);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<div>
				{todoEdits.map((todoEdit) => (
					<TodoEdit
						todoEdit={todoEdit}
						paramString={paramString}
					/>
				))}
			</div>
		</div>
	);
}

export default TodoEditForm;
