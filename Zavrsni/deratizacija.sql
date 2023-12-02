
use master;
go
drop database if exists deratizacija;
go
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
vrsta varchar(50)
);

create table otrovi(
sifra int not null primary key identity (1,1),
naziv varchar(50) not null,
aktivnatvar varchar(50) not null,
kolicina decimal(3,2),
casbroj varchar(20) 
);

create table termini(
sifra int not null primary key identity (1,1),
datum date not null,
djelatnik int not null,
objekt int not null,
otrov int not null,
napomena varchar(200)
);

--vanjski ključevi

alter table termini add foreign key (djelatnik) references djelatnici (sifra);
alter table termini add foreign key (objekt) references objekti (sifra);
alter table termini add foreign key (otrov) references otrovi (sifra);

--unos podataka u tablicu djelatnici

insert into djelatnici (ime,prezime,brojmobitela,oib,struka) values
-- 1
('Marko','Potepuh','095/659-3256',30953866267,'Sanitarni tehničar'),
-- 2
('Žorž','Kuruazije','096/753-7913',49438131275,'Veterinarski tehničar'),
-- 3
('Stanimir','Horvat','094/159-4862',26566935494,'Sanitarni inženjer'),
-- 4
('Benny','Hill','092/913-8247',12468790391,'Diplomirani sanitarni inženjer');


--unos podataka u tablicu objekti

insert into objekti (mjesto,adresa,vrsta) values
-- 1
('Osijek','Josipa Hutlera 12','Stambeni objekt'),
-- 2
('Valpovo','Stjepana Radića 67','Objekt javne namjene'),
-- 3
('Petlovac','Trg bana Jelačića 9','Zelena površina'),
-- 4
('Vinkovci','Europska Avenija 15','Park');


--unos podataka u tablicu otrovi

insert into otrovi (naziv,aktivnatvar,kolicina,casbroj) values
-- 1
('Brodilon meki mamac','Bromadiolon',0.4,'7654-82-6'),
-- 2
('Brodilon parafinski blok','Bromadiolon',0.5,'3467-76-7'),
-- 3
('Ratimor Brodifacum peleti','Brodifacum',1.2,'3251-61-9'),
-- 4
('Ratron GL','Cinkov fosfid',0.3,'1864-37-5');


--unos podataka u tablicu termin

insert into termini (datum,djelatnik,objekt,otrov,napomena) values
('2023-11-14',2,1,3,'Podrum objekta uredan.'),
('2023-11-09',1,4,2,'Primjećene aktivne rupe glodavaca. Tretirane i sanirane.'),
('2023-11-11',4,3,2,'Primjećene aktivne rupe glodavaca. Tretirane i sanirane.'),
('2023-11-15',3,2,4,'Glodavci viđeni oko objekta. Deratizacija provedena.');


select a.datum, b.ime, b.prezime, 
c.mjesto, c.adresa, d.naziv, d.kolicina, a.napomena
from termini a inner join djelatnici b
on a.djelatnik=b.sifra
inner join objekti c on a.objekt=c.sifra
inner join otrovi d on a.otrov=d.sifra;

select * from termini;