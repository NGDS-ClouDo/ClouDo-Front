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
// 기록 조회
app.post("/record", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM Record WHERE userID = " + req.body.userID +"", async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

// 기록조회 (카테고리 포함하는)
app.post("/record/category", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM Record as td, Category as tc WHERE tc.categoryName = \""+req.body.categoryName+"\" and tc.recordID = td.recordID;", async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

// 기록 수정
app.post("/record/edit", (req, res) => {
	console.log(req.body);
	db.query("UPDATE Record SET recordName = '"+ req.body.recordName 
	+"', recordDueDate = '"+req.body.recordDueDate
	+"', recordMemo = '"+req.body.recordMemo
	+"', recordDone = '"+req.body.recordDone
	+"' WHERE recordID = " + req.body.recordID
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

// 기록 추가
app.post("/record/add", (req, res) => {
	console.log(req.body);
	db.query("insert into Record(userID, recordName, recordDueDate, recordDone, recordMemo) values ("
	+req.body.userID +", '"
	+ req.body.recordName 
	+"', '"+req.body.recordDueDate
	+"', "+req.body.recordDone
	+", '"+req.body.recordMemo +"')"
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

// 기록 삭제
app.delete("/record/remove", (req, res) => {
	console.log(req.body);
	console.log("delete from Record where recordID="+ req.body.recordID);
	db.query("delete from Record where recordID="+ req.body.recordID
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

// 카테고리 삭제
app.delete("/category/remove", (req, res) => {
	console.log(req.body);
	db.query("delete from Category where recordID='"+req.body.recordID+"' and categoryName ='"
	+ req.body.categoryName +"'"
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

// 카테고리 추가
app.post("/category/add", (req, res) => {
	console.log(req.body);
	db.query("insert into Category(recordID, userID, categoryName) values ("
	+ req.body.recordID+", "+req.body.userID+", '"+req.body.categoryName +"')"
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});
});

// 카테고리 조회
app.post("/category", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM Category WHERE recordID = '" + req.body.recordID +"'and userID = '"+ req.body.userID+"'", async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

// 모든 카테고리 조회
app.post("/category/all", (req, res) => {
	console.log(req.body);
	db.query("SELECT distinct categoryName FROM Category WHERE userID = " + req.body.userID +"" , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

// 유저 추가
app.post("/user/add", (req, res) => {
	console.log(req.body);
	db.query("insert into User(userName) values ('"
	+ req.body.userName +"')"
	 , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
		}
	});

});

// 모든 사용자 조회
app.post("/user/all", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM User" , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

//userID 로 사용자 이름 조회
app.post("/user", (req, res) => {
	console.log(req.body);
	db.query("SELECT * FROM User WHERE userID = '"+req.body.userID+"'" , async function (err, rows, fields) {
		if (err) {
			console.log("데이터 가져오기 실패");
		} else {
			console.log(rows);
			await res.send(rows);
		}
	});
});

app.post("/test", (req, res) => {
	console.log(req.body);
});



// app.post("/record/specific/", (req, res) => {
// 	console.log(req.body);
// 	db.query("SELECT * FROM Record WHERE recordID = " + req.body.recordID , async function (err, rows, fields) {
// 		if (err) {
// 			console.log("데이터 가져오기 실패");
// 		} else {
// 			console.log(rows);
// 			await res.send(rows);
// 		}
// 	});
// });
