
drop table Category;
DROP table Record;
DROP table User;

create table User(
   	userID int primary key auto_increment,
    userName varchar(200)
);

create table Record(
   	recordID int primary key auto_increment,
    userID int,
    recordName varchar(200),
    recordCreatedDate datetime default now(),
    recordDueDate datetime,
    recordDone boolean,
    recordMemo varchar(10000),
    foreign key (userID) references User(userID)
    on update cascade
    on delete cascade
);
ALTER table User auto_increment = 1;
create table Category(
	recordID int,
    userID int,
    categoryName varchar(200),
    
    foreign key (recordID) references Record(recordID)
    on update cascade
    on delete cascade,
    foreign key (userID) references User(userID)
    on update cascade
    on delete cascade,
    primary key (recordID, categoryName)
);
insert into User(userName)
values
('u1'),
("u2"),
("u3"),
("u4");

insert into Record(userID, recordName, recordCreatedDate, recordDueDate,recordDone, recordMemo)
values
(1, '1', '2022-11-10 10:10:10', '2022-11-10 10:10:11',true, 'a');
insert into Record(userID, recordName, recordCreatedDate, recordDueDate,recordDone, recordMemo)
values
(1, '2', '2022-11-10 10:10:12', '2022-11-10 10:10:12',true, 'b');

insert into Category(recordID, userID, categoryName)
values
(1, 1, "testCat1"),
(1, 1, "testCat2"),
(2, 1, "testCat3"),
(2, 1,  "testCat2");
SELECT * FROM Record as td, Category as tc WHERE tc.categoryName = "testCat2" and tc.recordID = td.recordID;