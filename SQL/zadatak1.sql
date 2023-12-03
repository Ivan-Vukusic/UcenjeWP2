use master;
go
drop database if exists JLS;
go
create database JLS collate Croatian_CI_AS;
go
use JLS;

create table zupani(
sifra int not null primary key identity (1,1),
ime varchar(50) not null,
prezime varchar(50) not null
);

create table zupanije(
sifra int not null primary key identity (1,1),
naziv varchar(50) not null,
zupan int not null references zupani(sifra)
);

create table opcine(
sifra int not null primary key identity (1,1),
naziv varchar(50) not null,
zupanija int not null references zupanije(sifra)
);

create table mjesta(
sifra int not null primary key identity (1,1),
naziv varchar(50) not null,
opcina int not null references opcine(sifra)
);

insert into zupani (ime,prezime) values
('Mato','Lukić'),
('Igor','Andrović'),
('Darko','Koren');

insert into zupanije (naziv,zupan) values
('Osječko-baranjska',1),
('Virovitičko-podravska',2),
('Koprivničko-križevačka',3);

insert into opcine (naziv,zupanija) values
('Drenje',1),
('Koška',1),
('Gradina',2),
('Zdenci',2),
('Kalnik',3),
('Molve',3);

 insert into mjesta (naziv,opcina) values
('Drenje',1),
('Mandičevac',1),
('Koška',2),
('Andrijevac',2),
('Gradina',3),
('Lipovac',3),
('Zdenci',4),
('Grudnjak',4),
('Kalnik',5),
('Šopron',5),
('Molve',6),
('Čingi-Lingi',6);

select * from zupani;
select * from zupanije;
select * from opcine;
select * from mjesta;

update mjesta set naziv='Paljevina' where sifra=1;
update mjesta set naziv='Detkovac' where sifra=5;
update mjesta set naziv='Bankovci' where sifra=7;
update mjesta set naziv='Kamešnica' where sifra=10;
update mjesta set naziv='Repaš' where sifra=12;

select * from opcine;
select * from mjesta;

delete from mjesta where sifra in (5,6,9,10); 

delete from opcine where sifra in (3,5);

select * from opcine;
select * from mjesta;