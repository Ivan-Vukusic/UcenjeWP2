use master;

go

drop database if exists kolokvij5;

go

create database kolokvij5 collate Croatian_CI_AS;

go

use kolokvij5;

create table zarucnik(
sifra int not null primary key identity(1,1),
jmbg char(11),
lipa decimal(12,8),
indiferentno bit not null
);

create table mladic(
sifra int not null primary key identity(1,1),
kratkamajica varchar(48) not null,
haljina varchar(30) not null,
asocijalno bit,
zarucnik int references zarucnik(sifra)
);

create table cura(
sifra int not null primary key identity(1,1),
carape varchar(41) not null,
maraka decimal(17,10) not null,
asocijalno bit,
vesta varchar(47) not null
);

create table svekar(
sifra int not null primary key identity(1,1),
bojakose varchar(33),
majica varchar(31),
carape varchar(31) not null,
haljina varchar(43),
narukvica int,
eura decimal(14,5) not null
);

create table svekar_cura(
sifra int not null primary key identity(1,1),
svekar int not null references svekar(sifra),
cura int not null references cura(sifra)
);

create table punac(
sifra int not null primary key identity(1,1),
dukserica varchar(33),
prviputa datetime not null,
majica varchar(36),
svekar int not null references svekar(sifra)
);

create table punica(
sifra int not null primary key identity(1,1),
hlace varchar(43) not null,
nausnica int not null,
ogrlica int,
vesta varchar(49) not null,
modelnaocala varchar(31) not null,
treciputa datetime not null,
punac int not null references punac(sifra)
);

create table ostavljena(
sifra int not null primary key identity(1,1),
majica varchar(33),
ogrlica int not null,
carape varchar(44),
stilfrizura varchar(42),
punica int not null references punica(sifra)
);

insert into zarucnik (jmbg,lipa,indiferentno) values

('77765984532',3.65,1),
('65985698669',2.96,0),
('23522357985',4.52,1);

insert into mladic (kratkamajica,haljina,asocijalno,zarucnik) values

('big','crvena',0,1),
('meduim','plava',1,2),
('small','roza',0,3);

insert into cura (carape,maraka,asocijalno,vesta) values

('reggy',9.64,1,'božićna'),
('jimmy',6.58,0,'zelena'),
('paison',3.74,0,'tirkizna');

insert into svekar (bojakose,majica,carape,haljina,narukvica,eura) values

('plava','alpha','heh','bež',15,5.44),
('smeđa','ninja','hah','blu',19,7.36),
('crna','lacoste','hoh','šmi',27,5.97);

insert into svekar_cura (svekar,cura) values

(1,1),
(2,2),
(3,3);

insert into punac (dukserica,prviputa,majica,svekar) values

('siva','2023-08-07','plava',1),
('žuta','2023-09-03','crna',2),
('ljubičasta','2023-10-10','bijela',3);

insert into punica (hlace,nausnica,ogrlica,vesta,modelnaocala,treciputa,punac) values

('kratke',15,25,'glupa','polis','2023-01-23',1),
('duge',24,39,'bez rukava','mutno','2023-03-09',2),
('srednje',31,12,'prozračna','kmica','2023-05-29',3);

insert into ostavljena (majica,ogrlica,carape,stilfrizura,punica) values

('elf',15,'bli','fudbalerka',1),
('šuki',16,'bla','talijanka',2),
('zara',11,'blu','nulerica',3);


update mladic set haljina='Osijek';

select haljina from mladic;

delete from ostavljena where ogrlica=17;

select majica from punac where prviputa is null;

select a.asocijalno, e.nausnica, f.stilfrizura
from cura a inner join svekar_cura b
on a.sifra=b.cura
inner join svekar c on c.sifra=b.svekar
inner join punac d on c.sifra=d.svekar
inner join punica e on d.sifra=e.punac
inner join ostavljena f on e.sifra=f.punica
where d.prviputa is not null and c.majica like '%ba%'
order by e.nausnica desc;


select majica, carape from svekar
where not exists (select * from svekar_cura where svekar.sifra = svekar_cura.sifra);