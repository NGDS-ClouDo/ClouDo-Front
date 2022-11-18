
drop table todoCategory;
DROP table todoData;
DROP table todoUser;

create table todoUser(
   	uid int primary key auto_increment,
    u_name varchar(200)
);

create table todoData(
   	tid int primary key auto_increment,
    uid int,
    t_name varchar(200),
    t_created_date datetime default now(),
    t_due_date datetime,
    t_done boolean,
    t_memo varchar(10000),
    foreign key (uid) references todoUser(uid)
);
ALTER table todoUser auto_increment = 1;
create table todoCategory(
	tid int,
    uid int,
    category varchar(200),
    
    foreign key (tid) references todoData(tid),
    foreign key (uid) references todoUser(uid),
    primary key (tid, category)
);
insert into todoUser(u_name)
values
('u1'),
("u2"),
("u3"),
("u4");

insert into todoData(uid, t_name, t_created_date, t_due_date,t_done, t_memo)
values
(1, '1', '2022-11-10 10:10:10', '2022-11-10 10:10:11',true, 'a');
insert into todoData(uid, t_name, t_created_date, t_due_date,t_done, t_memo)
values
(1, '2', '2022-11-10 10:10:12', '2022-11-10 10:10:12',true, 'b');

insert into todoCategory(tid, uid, category)
values
(1, 1, "testCat1"),
(1, 1, "testCat2"),
(2, 1, "testCat3"),
(2, 1,  "testCat2");

SELECT * FROM todoData as td, todoCategory as tc WHERE tc.category = "testCat2" and tc.tid = td.tid;