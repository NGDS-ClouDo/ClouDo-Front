create table todoData(
   	tid int primary key,
    t_name varchar(200),
    t_created_date datetime default now(),
    t_due_date datetime,
    t_done boolean,
    t_memo varchar(10000)
);
create table todoCategory(
	tid int,
    category varchar(200),
    
    foreign key (tid) references todoData(tid),
    primary key (tid, category)
);

insert into todoData(tid, t_name, t_created_date, t_due_date,t_done, t_memo)
values
(1, '1', '2022-11-10 10:10:10', '2022-11-10 10:10:11',true, 'a');
insert into todoData(tid, t_name, t_created_date, t_due_date,t_done, t_memo)
values
(2, '2', '2022-11-10 10:10:12', '2022-11-10 10:10:12',true, 'b');

insert into todoCategory(tid, category)
values
(2, "testCat3"),
(2, "testCat2");

SELECT * FROM todoData as td, todoCategory as tc WHERE tc.category = "testCat2" and tc.tid = td.tid;
DROP table todoData;