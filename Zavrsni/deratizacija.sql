use master;

go

drop database if exists deratizacija;

go

create database deratizacija collate Croatian_CI_AS;

go

use deratizacija;

--SELECT name, collation_name FROM sys.databases;
--GO

--ALTER DATABASE db_aa5999_deratizacija SET SINGLE_USER WITH
--ROLLBACK IMMEDIATE;
--GO
--ALTER DATABASE db_aa5999_deratizacija COLLATE Croatian_CI_AS;
--GO
--ALTER DATABASE db_aa5999_deratizacija SET MULTI_USER;
--GO
--SELECT name, collation_name FROM sys.databases;
--GO

drop table vrste;
drop table objekti;
drop table djelatnici;
drop table otrovi;
drop table termini;


create table operateri(
	sifra int not null primary key identity(1,1),
	email varchar(50) not null,
	lozinka varchar(200) not null
);

-- Lozinka DobraPrava99 generirana pomoću https://bcrypt-generator.com/
insert into operateri values ('ivan.vukusic@yahoo.com',
'$2a$12$putP7MUMh2byPaSnWjBivOMRBzNI2uhhp1Krh0EeTIR3T9AJl/zUu');

create table djelatnici(

	sifra int not null primary key identity (1,1),
	ime varchar(50) not null,
	prezime varchar(50) not null,
	brojmobitela varchar(20),
	oib char(11),
	struka varchar(50)

);


create table vrste(

	sifra int not null primary key identity (1,1),
	naziv varchar(50) not null

);


create table objekti(

	sifra int not null primary key identity (1,1),
	mjesto varchar(50) not null,
	adresa varchar(50) not null,
	vrsta int not null references vrste(sifra)

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
	djelatnik int not null references djelatnici (sifra),
	objekt int not null references objekti (sifra),
	otrov int not null references otrovi (sifra),
	napomena varchar(200)

);


insert into djelatnici (ime,prezime,brojmobitela,oib,struka) values

('Marko','Potepuh','095/659-3256','30953866267','Sanitarni tehničar'),

('Žorž','Kuruazije','096/753-7913','49438131275','Veterinarski tehničar'),

('Stanimir','Horvat','094/159-4862','26566935494','Sanitarni inženjer'),

('Benny','Hill','092/913-8247','12468790391','Diplomirani sanitarni inženjer');


insert into vrste (naziv) values

('Stambeni objekt'),

('Objekt javne namjene'),

('Zelena površina'),

('Park');


insert into objekti (mjesto,adresa,vrsta) values

('Osijek','Josipa Hutlera 12',1),

('Valpovo','Stjepana Radića 67',2),

('Petlovac','Trg bana Jelačića 9',3),

('Vinkovci','Europska Avenija 15',4);


insert into otrovi (naziv,aktivnatvar,kolicina,casbroj) values

('Brodilon meki mamac','Bromadiolon',0.4,'7654-82-6'),

('Brodilon parafinski blok','Bromadiolon',0.5,'3467-76-7'),

('Ratimor Brodifacum peleti','Brodifacum',1.2,'3251-61-9'),

('Ratron GL','Cinkov fosfid',0.3,'1864-37-5');


insert into termini (datum,djelatnik,objekt,otrov,napomena) values
('2023-11-14',2,1,3,'Podrum objekta uredan.'),

('2023-11-09',1,4,2,'Primjećene aktivne rupe glodavaca. Tretirane i sanirane.'),

('2023-11-11',4,3,2,'Primjećene aktivne rupe glodavaca. Tretirane i sanirane.'),

('2023-11-15',3,2,4,'Glodavci viđeni oko objekta. Deratizacija provedena.');


