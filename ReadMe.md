# 프론트 작업

* 담당 : 이찬하
* 개발 도구: 자바스크립트, 리액트

# 시작 방법

`npm start`

## 내용

* server: 프론트 요청 테스트용 Node.js 서버 (추후 삭제)
* src: 리액트 페이지 파일들
* public: 프론트 페이지에 노출될 asset들 (이미지, 영상 등)

## 아직 협의되지 않은 내용

* 프론트에서 백으로 보내는 http 명세
* 데이터 형식

### 프론트에서 백으로 보내는 http 명세
```
백엔드 서버: http://localhost:3001/data (백엔드 요청에 따라 변동예정)

method: post

headers:
	"content-type": "application/json",

body: JSON.stringify({ // json 형식
	all: true, false // true 일 경우 완료 여부 상관없이 출력(done 은 무시됨), false일 경우 done을 확인해야함.
	done: true, false // true일 경우 완료 항목을 요청하는 상황, false일 경우 완료하지 않은 항목을 요청
	search_string: params.search, // 이름 또는 내용에서 params.search 를 포함하는 항목들을 요청
	order_by: params.order, // 정렬 기준(날짜, 제목, 마감일? 등)
	order: params.desc, // 오름차순 내림차순
	page: (params.page - 1), // 몇 번째 페이지 인지 => 1 페이지부터 시작, 1페이지에는 10개의 TODO List 노출
}),
```
// params.XX 는 문자열 데이터

### 데이터 형식

```
create table todoData(
   	tid int primary key, // 작업 pk
    t_name varchar(200), // 작업 이름
    t_created_date datetime default now(), // 생성일
    t_due_date datetime, // 완료 기일
    t_memo varchar(10000) // 내용
);
```