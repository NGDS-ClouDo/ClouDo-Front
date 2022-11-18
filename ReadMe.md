# 프론트 작업

* 담당 : 이찬하
* 개발 도구: 자바스크립트, 리액트

# 시작 방법

0. MYSQL DB 준비

	* ./server/connections.js 파일을 자신의 환경에 맞게 수정
	* ./dbScheme/ 에 첨부된 SQL 문 참고하여 테이블과 더미 데이터 생성

1. 프로젝트 디렉터리에서

	`npm start`

2. ./server 디렉터리에서

	`node server.js`

## 내용

* server: 프론트 요청 테스트용 Node.js 서버 (추후 삭제)
* src: 리액트 페이지 파일들
* public: 프론트 페이지에 노출될 asset들 (이미지, 영상 등)

## 아직 협의되지 않은 내용

* 프론트에서 백으로 보내는 http 명세
* 데이터 형식

### 프론트에서 백으로 보내는 http 명세
1. Todo list data 요청

	```
	백엔드 서버: http://localhost:3001/data (백엔드 요청에 따라 변동예정)

	method: post

	headers:
		"content-type": "application/json",

	body: JSON.stringify({ // json 형식
		range: {"all", "done", "undone"}, // all 일 경우 완료 여부 상관없이 출력, done일 경우 완료항목만, undone일 경우 완료되지 않은 항목만.
		search_string: params.search, // 이름 또는 내용에서 params.search 를 포함하는 항목들을 요청
		order_by: params.order, // 정렬 기준(날짜, 제목, 마감일? 등)
		order: params.desc, // 오름차순 내림차순
		page: (params.page - 1), // 몇 번째 페이지 인지 => 1 페이지부터 시작, 1페이지에는 10개의 TODO List 노출
	}),
	```
	// params.XX 는 문자열 데이터

2. todo list 에 링크된 카테고리를 가져오는 요청

	```
	백엔드 서버: http://localhost:3001/category (백엔드 요청에 따라 변동예정)

	method: post

	headers:
		"content-type": "application/json",

	body: JSON.stringify({ // json 형식
		recordID: recordID // 해당 recordID에 링크된 모든 카테고리 값들을 가져올 것을 요청
		// 중요 특이사항: recordID: 0일 경우 모든 category (distinct) 값을 가져와야함
	}),
	```
	// params.XX 는 문자열 데이터

3. 요쳥한 category 값을 보유하는 모든 Todo List를 가져오는 요청

	```
	백엔드 서버: http://localhost:3001/category (백엔드 요청에 따라 변동예정)

	method: post

	headers:
		"content-type": "application/json",

	body: JSON.stringify({ // json 형식
		category: params.category, // 여기에 해당하는 모든 todoList를 요청
		range: {"all", "done", "undone"},
		search_string: params.search,
		order_by: params.order,
		order: params.desc,
		page: (params.page - 1),
	}),
	```

4. Todo List 등록 요청

	```
	백엔드 서버: http://localhost:3001/NewToDo

	method: put

	headers:
		"content-type": "application/json",

	body: JSON.stringify({
		recordName: tName,
		recordDueDate: tDueDate,
		recordDone: tDone,
		recordMemo: tMemo,
		cat: tCategory // 카테고리에 대한 처리는 아직 미정. (협의 필요)
	}),
	```

5. Todo List 수정 요청 (완료 <=> 미완 표시 등 포함)

	```
	백엔드 서버: http://localhost:3001/ToDoEdit

	method: put

	headers:
		"content-type": "application/json",

	body: JSON.stringify({
		recordID: Record.recordID,
		recordName: tName,
		recordCreatedDate: Record.recordCreatedDate,
		recordDueDate: tDueDate,
		recordDone: tDone,
		recordMemo: tMemo
	}),
	```


6. Todo List 삭제 요청

	```
	백엔드 서버: http://localhost:3001/ToDoEdit

	method: delete

	headers:
		"content-type": "application/json",

	body: JSON.stringify({
		recordID: Record.recordID,
	}),
	```
7. 

### 데이터 형식

```
create table Record(
   	recordID int primary key, // 작업 pk
    recordName varchar(200), // 작업 이름
    recordCreatedDate datetime default now(), // 생성일
    recordDueDate datetime, // 완료 기일
    recordMemo varchar(10000), // 내용
    recordDone boolean // 완료 여부
);

create table Category(
	recordID int,
    category varchar(200),
    
    foreign key (recordID) references Record(recordID),
    primary key (recordID, category)
);
```