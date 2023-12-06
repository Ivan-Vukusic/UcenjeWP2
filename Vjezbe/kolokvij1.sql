use master;

go

drop database if exists kolokvij1;

go

create database kolokvij1 collate Croatian_CI_AS;

go

use kolokvij1;

create table punac(

sifra int not null primary key identity (1,1),
ogrlica int,
gustoca decimal(14,9),
hlace varchar(41) not null
);

create table sestra(

sifra int not null primary key identity (1,1),
introvertno bit,
haljina varchar(31) not null,
maraka decimal(16,6),
hlace varchar(46) not null,
narukvica int not null
);

create table svekar(

sifra int not null primary key identity (1,1),
bojaociju varchar(40) not null,
prstena int,
dukserica varchar(41),
lipa decimal(13,8),
eura decimal(12,7),
majica varchar(35)
);

create table cura(

sifra int not null primary key identity (1,1),
novcica decimal(16,5) not null,
gustoca decimal(18,6) not null,
lipa decimal(13,10),
ogrlica int not null,
bojakose varchar(38),
suknja varchar(36),
punac int references punac(sifra)
);

create table zena(

sifra int not null primary key identity (1,1),
treciputa datetime,
hlace varchar(46),
kratkamajica varchar(31) not null,
jmbg char(11) not null,
bojaociju varchar(39) not null,
haljina varchar(44),
sestra int not null references sestra(sifra)
);

create table muskarac(

sifra int not null primary key identity (1,1),
bojaociju varchar(50) not null,
hlace varchar(30),
modelnaocala varchar(43),
maraka decimal(14,5) not null,
zena int not null references zena(sifra)
);

create table mladic(

sifra int not null primary key identity (1,1),
suknja varchar(50) not null,
kuna decimal(16,8) not null,
drugiputa datetime,
asocijalno bit not null,
ekstrovertno bit not null,
dukserica varchar(38) not null,
muskarac int references muskarac(sifra)
);

create table sestra_svekar(

sifra int not null primary key identity (1,1),
sestra int not null references sestra(sifra),
svekar int not null references svekar(sifra)
);


insert into punac (ogrlica,gustoca,hlace) values

(1,25.46,'jeans'),
(2,14.97,'samt'),
(3,24.13,'jeans');


insert into sestra (introvertno,haljina,maraka,hlace,narukvica) values

(1,'zelena gabani',567.24,'capri',25),
(0,'crna kratka',1286.48,'kratke',20),
(1,'plava duga',2978.66,'stretch',18);


insert into zena (treciputa,hlace,kratkamajica,jmbg,bojaociju,haljina,sestra) values

('2023-07-06','argo kratke','elf','67985432894','smeđa','svečana',1),
('2023-10-28','zanah tri-četvrt','gucci','15794359873','plava','casual',2),
('2023-11-30','chic duge','zara','57981569773','smeđa','casual',3);


insert into svekar (bojaociju,prstena,dukserica,lipa,eura,majica) values

('plava',2,'plava',1236.64,251.79,'alpha'),
('zelena',4,'crna',253.89,157.68,'ted'),
('smeđa',7,'siva',7625.48,386.57,'razor');


insert into muskarac (bojaociju,hlace,modelnaocala,maraka,zena) values

('zelena','jeans','police',24.12,1),
('plava','samt','rayban',16.29,2),
('smeđa','chino','polaroid',21.69,3);


insert into mladic (suknja,kuna,drugiputa,asocijalno,ekstrovertno,dukserica,muskarac) values

('kilt',12.98,'2023-02-18',0,1,'siva',1),
('kilt',14.65,'2023-05-11',0,1,'crna',2),
('kilt',15.03,'2023-06-24',0,1,'plava',3);


insert into cura (novcica,gustoca,ogrlica) values

(153.98,18.65,1),
(276.52,15.23,2),
(648.29,17.87,3);


insert into sestra_svekar (sestra,svekar) values

(1,1),
(2,2),
(3,3);


update cura set gustoca=15.78;

delete from mladic where kuna>15.78;

select kratkamajica from zena where hlace like '%ana%';

select a.asocijalno, b.hlace, f.dukserica
from mladic a inner join muskarac b on b.sifra=a.muskarac 
inner join zena c on c.sifra=b.zena
inner join sestra d on d.sifra=c.sestra 
inner join sestra_svekar e on d.sifra=e.sestra 
inner join svekar f on f.sifra=e.svekar 
where c.hlace like 'a%' and d.haljina like '%ba%'
order by 2 desc;


select a.haljina,a.maraka
from sestra a left join sestra_svekar b on a.sifra=b.sestra 
where b.sestra is null;