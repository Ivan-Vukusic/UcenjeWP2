use master;
go
drop database if exists kolokvij6;
go
create database kolokvij6 collate Croatian_CI_AS;
go
use kolokvij6;

create table ostavljena(
sifra int not null primary key identity(1,1),
prviputa datetime not null,
kratkamajica varchar(39) not null,
drugiputa datetime,
maraka decimal(14,10)
);

create table prijatelj(
sifra int not null primary key identity(1,1),
haljina varchar(35),
prstena int not null,
introvertno bit,
stilfrizura varchar(36) not null
);

create table prijatelj_ostavljena(
sifra int not null primary key identity(1,1),
prijatelj int not null references prijatelj(sifra),
ostavljena int not null references ostavljena(sifra)
);

create table brat(
sifra int not null primary key identity(1,1),
nausnica int not null,
treciputa datetime not null,
narukvica int not null,
hlace varchar(31),
prijatelj int references prijatelj(sifra)
);

create table zena(
sifra int not null primary key identity(1,1),
novcica decimal(14,8) not null,
narukvica int not null,
dukserica varchar(40) not null,
haljina varchar(30),
hlace varchar(32),
brat int not null references brat(sifra)
);

create table decko(
sifra int not null primary key identity(1,1),
prviputa datetime,
modelnaocala varchar(41),
nausnica int,
zena int not null references zena(sifra)
);

create table punac(
sifra int not null primary key identity(1,1),
ekstrovertno bit not null,
suknja varchar(30) not null,
majica varchar(44) not null,
prviputa datetime not null
);

create table svekrva(
sifra int not null primary key identity(1,1),
hlace varchar(48) not null,
suknja varchar(42) not null,
ogrlica int not null,
treciputa datetime not null,
dukserica varchar(32) not null,
narukvica int not null,
punac int references punac(sifra)
);

insert into prijatelj (prstena,stilfrizura) values

(15,'kratko'),
(21,'nulerica'),
(13,'talijanka');

insert into ostavljena (prviputa,kratkamajica) values

('2023-04-11','elf'),
('2023-05-02','zara'),
('2023-08-12','trixie');

insert into prijatelj_ostavljena (prijatelj,ostavljena) values

(1,1),
(2,2),
(3,3);

insert into brat (nausnica,treciputa,narukvica) values

(15,'2023-01-25',22),
(18,'2023-01-30',32),
(19,'2023-02-28',42);

insert into zena (novcica,narukvica,dukserica,brat) values

(3.78,8,'plava',1),
(2.98,3,'crna',2),
(9.51,7,'siva',3);

insert into svekrva (hlace,suknja,ogrlica,treciputa,dukserica,narukvica) values

('rifle','duga',12,'2023-02-03','siva',6),
('štof','srednja',34,'2023-03-12','smeđa',9),
('samt','kratka',97,'2023-04-02','zelena',11);

update svekrva set suknja='Osijek';

select suknja from svekrva;

delete from decko where modelnaocala<'AB';

select narukvica from brat where treciputa is null;

select a.drugiputa, e.narukvica, f.zena
from ostavljena a inner join prijatelj_ostavljena b on
a.sifra=b.ostavljena
inner join prijatelj c on c.sifra=b.prijatelj
inner join brat d on c.sifra=d.prijatelj
inner join zena e on d.sifra=e.brat
inner join decko f on e.sifra=f.zena
where d.treciputa is not null and c.prstena=219
order by 2 desc;


select prstena, introvertno from prijatelj
where not exists (select * from prijatelj_ostavljena where prijatelj.sifra=prijatelj_ostavljena.prijatelj);