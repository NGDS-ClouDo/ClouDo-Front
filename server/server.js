const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("./connection");
const { useInsertionEffect } = require("react");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/data", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM todoData WHERE uid = '" + req.body.uid +"'", async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

app.post("/cats", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM todoData as td, todoCategory as tc WHERE tc.category = \""+req.body.category+"\" and tc.tid = td.tid;", async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

app.post("/TodoEdit", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM todoData WHERE tid = " + req.body.tid , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

app.put("/test", (req, res) => {
	console.log(req.body);
});

app.put("/TodoEdit", (req, res) => {
	console.log(req.body);
	db.query("UPDATE todoData SET t_name = '"+ req.body.t_name 
	+"', t_due_date = '"+req.body.t_due_date
	+"', t_memo = '"+req.body.t_memo
	+"', t_done = '"+req.body.t_done
	+"' WHERE tid = " + req.body.tid
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

app.put("/NewTodo", (req, res) => {
	console.log(req.body);
	db.query("insert into todoData(uid, t_name, t_due_date, t_done, t_memo) values ("
	+req.body.uid +", '"
	+ req.body.t_name 
	+"', '"+req.body.t_due_date
	+"', "+req.body.t_done
	+", '"+req.body.t_memo +"')"
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

app.put("/NewUser", (req, res) => {
	console.log(req.body);
	db.query("insert into todoUser(u_name) values ('"
	+ req.body.u_name +"')"
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});

});
app.post("/user", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM todoUser" , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

app.post("/category", (req, res) => {
	console.log(req.body);
	if (req.body.tid !== 0)
	{
		db.query("SELECT * FROM todoCategory WHERE tid = " + req.body.tid , async function (err, rows, fields) {
			if (err) {
				console.log("데이터 가져오기 실패");
			} else {
				console.log(rows);
				await res.send(rows);
			}
		});
	}
	else{
		db.query("SELECT distinct category FROM todoCategory WHERE uid = '" + req.body.uid +"'" , async function (err, rows, fields) {
			if (err) {
				console.log("데이터 가져오기 실패");
			} else {
				console.log(rows);
				await res.send(rows);
			}
		});
		
	}
});
