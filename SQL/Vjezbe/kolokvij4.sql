use master;

go

drop database if exists kolokvij4;

go

create database kolokvij4 collate Croatian_CI_AS;

go

use kolokvij4;

create table ostavljen(
sifra int not null primary key identity(1,1),
modelnaocala varchar(43),
introvertno bit,
kuna decimal(14,10)
);

create table punac(
sifra int not null primary key identity(1,1),
treciputa datetime,
majica varchar(46),
jmbg char(11) not null,
novcica decimal(18,7) not null,
maraka decimal(12,6) not null,
ostavljen int not null references ostavljen(sifra)
);

create table mladic(
sifra int not null primary key identity(1,1),
kuna decimal(15,9),
lipa decimal(18,5),
nausnica int,
stilfrizura varchar(49),
vesta varchar(34) not null
);

create table zena(
sifra int not null primary key identity(1,1),
suknja varchar(39) not null,
lipa decimal(18,7),
prstena int not null
);

create table zena_mladic(
sifra int not null primary key identity(1,1),
zena int not null references zena(sifra),
mladic int not null references mladic(sifra)
);

create table snasa(
sifra int not null primary key identity(1,1),
introvertno bit,
treciputa datetime,
haljina varchar(44) not null,
zena int not null references zena(sifra)
);

create table becar(
sifra int not null primary key identity(1,1),
novcica decimal(14,8),
kratkamajica varchar(48) not null,
bojaociju varchar(36) not null,
snasa int not null references snasa(sifra)
);

create table prijatelj(
sifra int not null primary key identity(1,1),
eura decimal(16,9),
prstena int not null,
gustoca decimal(16,5),
jmbg char(11) not null,
suknja varchar(47) not null,
becar int not null references becar(sifra)
);


insert into ostavljen (modelnaocala,introvertno,kuna) values

('domet',1,25.36),
('pomrčina',0,75.21),
('pvc',1,46.25);

insert into punac (treciputa,majica,jmbg,novcica,maraka,ostavljen) values

('2023-05-11','plava','59865235145',21.45,3.55,1),
('2023-7-20','žuta','12154515469',15.16,4.22,2),
('2023-8-03','crna','55469895692',45.85,6.52,3);

insert into mladic (kuna,lipa,nausnica,stilfrizura,vesta) values

(2.55,3.11,8,'šišabobo','lacoste'),
(4.56,9.23,12,'vojnička','1 maj'),
(5.79,8.64,19,'kratka','sinsay');

insert into zena (suknja,lipa,prstena) values

('joana',6.45,5),
('patrice',3.26,8),
('estefanija',6.24,7);

insert into zena_mladic (zena,mladic) values

(1,1),
(2,2),
(3,3);

insert into snasa (introvertno,treciputa,haljina,zena) values

(1,'2023-02-18','long mary',1),
(0,'2023-03-14','shorty',2),
(0,'2023-06-12','medici',3);

insert into becar (novcica,kratkamajica,bojaociju,snasa) values

(2.55,'xxl','smeđa',1),
(3.41,'s','plava',2),
(4.59,'m','zelena',3);

insert into prijatelj (eura,prstena,gustoca,jmbg,suknja,becar) values

(4.56,25,6.98,'66658852123','mini',1),
(4.78,3,1.22,'88955568954','duga',2),
(6.99,2,3.58,'45123541254','kratka',3);


update punac set majica='Osijek';

select majica from punac;

delete from prijatelj where prstena>17;

select prstena from prijatelj;

select haljina from snasa where treciputa is null;

select a.nausnica, e.kratkamajica, f.jmbg
from mladic a inner join zena_mladic b
on a.sifra=b.mladic
inner join zena c on c.sifra=b.zena
inner join snasa d on c.sifra=d.zena
inner join becar e on d.sifra=e.snasa
inner join prijatelj f on e.sifra=f.becar
where d.treciputa is not null and c.lipa not like 29
order by 2 desc;


select lipa, prstena from zena
where not exists (select * from zena_mladic where zena.sifra = zena_mladic.sifra);