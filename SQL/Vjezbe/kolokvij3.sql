use master;
go
drop database if exists kolokvij3;
go
create database kolokvij3 collate Croatian_CI_AS;
go
use kolokvij3;

create table cura(
sifra int not null primary key identity(1,1),
dukserica varchar(49),
maraka decimal(13,7),
drugiputa datetime,
majica varchar(49),
novcica decimal(15,8),
ogrlica int not null
);
 
create table svekar(
sifra int not null primary key identity(1,1),
novcica decimal(16,8) not null,
suknja varchar(44) not null,
bojakose varchar(36),
prstena int,
narukvica int not null,
cura int not null references cura(sifra)
);

create table brat(
sifra int not null primary key identity(1,1),
jmbg char(11),
ogrlica int not null,
ekstrovertno bit not null
);

create table prijatelj(
sifra int not null primary key identity(1,1),
kuna decimal(16,10),
haljina varchar(37),
lipa decimal(13,10),
dukserica varchar(31),
indiferentno bit not null
);

create table prijatelj_brat(
sifra int not null primary key identity(1,1),
prijatelj int not null references prijatelj(sifra),
brat int not null references brat(sifra)
);

create table ostavljena(
sifra int not null primary key identity(1,1),
kuna decimal(17,5),
lipa decimal(15,6),
majica varchar(36),
modelnaocala varchar(31) not null,
prijatelj int references prijatelj(sifra)
);

create table snasa(
sifra int not null primary key identity(1,1),
introvertno bit,
kuna decimal(15,6) not null,
eura decimal(12,9) not null,
treciputa datetime,
ostavljena int not null references ostavljena(sifra)
);

create table punica(
sifra int not null primary key identity(1,1),
asocijalno bit,
kratkamajica varchar(44),
kuna decimal(13,8) not null,
vesta varchar(32) not null,
snasa int references snasa(sifra)
);


insert into cura (dukserica,maraka,drugiputa,majica,novcica,ogrlica) values

('crna',35.69,'2023-06-15','dugi rukav',845.12,20),
('siva',657.55,'2023-04-26','sportska',46.23,15),
('smeđa',5674.21,'2023-10-30','kratki rukav',67.25,18);

insert into svekar (novcica,suknja,bojakose,prstena,narukvica,cura) values

(568.56,'crvena','smeđa',36,8,1),
(7294.66,'žuta','crna',24,3,2),
(51.28,'ljubičasta','plava',40,7,3);

insert into brat (jmbg,ogrlica,ekstrovertno) values

('54987965321',23,1),
('56986532659',56,1),
('12354965812',25,1);

insert into prijatelj (kuna,haljina,lipa,dukserica,indiferentno) values

(75.64,'ljetna',62.51,'plava',0),
(64.32,'sportska',28.97,'crna',1),
(83.65,'casual',43.57,'zelena',0);

insert into prijatelj_brat (prijatelj,brat) values

(1,1),
(2,2),
(3,3);

insert into ostavljena (kuna,lipa,majica,modelnaocala,prijatelj) values

(42.55,36.87,'xl','čoro',1),
(97.65,34.58,'xxl','nevidjeh',2),
(44.31,95.29,'m','bato',3);

insert into snasa (introvertno,kuna,eura,treciputa,ostavljena) values

(1,23.51,64.21,'2023-11-21',1),
(0,46.22,83.59,'2023-12-01',2),
(1,57.24,49.30,'2023-11-16',3);

insert into punica (asocijalno,kratkamajica,kuna,vesta,snasa) values

(1,'elf',61.53,'duga',1),
(0,'smurf',42.87,'kratka',2),
(1,'zara',58.32,'srednja',3);


update svekar set suknja='Osijek';

select suknja from svekar;

delete from punica where kratkamajica='AB';

select majica from ostavljena where lipa not in (9,10,20,30,35);

select a.ekstrovertno, e.kuna, f.vesta
from brat a inner join prijatelj_brat b
on a.sifra=b.brat
inner join prijatelj c on c.sifra=b.prijatelj
inner join ostavljena d on c.sifra=d.prijatelj
inner join snasa e on d.sifra=e.ostavljena
inner join punica f on e.sifra=f.snasa
where d.lipa != 91 and c.haljina like '%ba%'
order by 2 desc;


select haljina, lipa from prijatelj
where not exists (select * from prijatelj_brat where prijatelj.sifra = prijatelj_brat.sifra);