use master;
go
drop database if exists deratizacija;
--stvaranje baze podataka
create database deratizacija;
go
alter database deratizacija collate Croatian_CI_AS;
go

--koristenje baze podataka
use deratizacija;

--stvaranje tablica unutar baze
create table djelatnici(
sifra int not null primary key identity (1,1),
ime varchar(50) not null,
prezime varchar(50) not null,
brojmobitela varchar(20),
oib char(11),
struka varchar(50)
);

create table objekti(
sifra int not null primary key identity (1,1),
mjesto varchar(50) not null,
adresa varchar(50) not null,
namjena varchar(50)
);

create table otrovi(
sifra int not null primary key identity (1,1),
naziv varchar(50) not null,
aktivnatvar varchar(50),
djelovanje varchar(50),
kolicina decimal(4,2),
casbroj int
);

create table termin(
sifra int not null primary key identity (1,1),
datum datetime not null,
djelatnik int not null,
objekt int not null,
otrov int not null,
napomena varchar(200)
);

--vanjski ključevi

alter table termin add foreign key (djelatnik) references djelatnici (sifra);
alter table termin add foreign key (objekt) references objekti (sifra);
alter table termin add foreign key (otrov) references otrovi (sifra);

--unos podataka u tablicu djelatnici

insert into djelatnici (ime,prezime) values
--1
('Marko','Potepuh'),
--2
('Žorž','Kuruazije'),
--3
('Stanimir','Horvat'),
--4
('Benny','Hill');


--unos podataka u tablicu objekti

insert into objekti (mjesto,adresa) values
-- 1
('Osijek','Josipa Hutlera 12'),
-- 2
('Valpovo','Stjepana Radića 67'),
-- 3
('Petlovac','Trg bana Jelačića 9'),
-- 4
('Vinkovci','Europska Avenija 15');


--unos podataka u tablicu otrovi

insert into otrovi (naziv) values
-- 1
('Bromadiolon meki mamac'),
-- 2
('Brodilon parafinski blok'),
-- 3
('Ratimor Brodifacum peleti'),
-- 4
('Ratron GL');


--unos podataka u tablicu termin

insert into termin (datum,djelatnik,objekt,otrov) values
('2023-11-14',2,1,3),
('2023-11-09',1,4,1),
('2023-11-11',4,3,2),
('2023-11-15',3,2,4);

--za provjeru podataka koristi se naredba: select * from 