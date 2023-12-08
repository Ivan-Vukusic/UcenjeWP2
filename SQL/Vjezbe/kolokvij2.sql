use master;

go

drop database if exists kolokvij2;

go

create database kolokvij2 collate Croatian_CI_AS;

go


use kolokvij2;

create table svekar(
sifra int not null primary key identity (1,1),
stilfrizura varchar(48),
ogrlica int not null,
asocijalno bit not null
);

create table decko(
sifra int not null primary key identity (1,1),
indiferentno bit,
vesta varchar(34),
asocijalno bit not null
);

create table zarucnica(
sifra int not null primary key identity (1,1),
narukvica int,
bojakose varchar(37) not null,
novcica decimal(15,9),
lipa decimal(15,8) not null,
indiferentno bit not null
);

create table decko_zarucnica(
sifra int not null primary key identity (1,1),
decko int not null references decko(sifra),
zarucnica int not null references zarucnica(sifra)
);

create table prijatelj(
sifra int not null primary key identity (1,1),
modelnaocala varchar(37),
treciputa datetime not null,
ekstrovertno bit not null,
prviputa datetime,
svekar int not null references svekar(sifra)
);

create table cura(
sifra int not null primary key identity (1,1),
haljina varchar(33) not null,
drugiputa datetime not null,
suknja varchar(38),
narukvica int,
introvertno bit,
majica varchar(40) not null,
decko int references decko(sifra) 
);

create table neprijatelj(
sifra int not null primary key identity (1,1),
majica varchar(32),
haljina varchar(43) not null,
lipa decimal(16,8),
modelnaocala varchar(49) not null,
kuna decimal(12,6) not null,
jmbg char(11),
cura int references cura(sifra)
);

create table brat(
sifra int not null primary key identity (1,1),
suknja varchar(47),
ogrlica int not null,
asocijalno bit not null,
neprijatelj int not null references neprijatelj(sifra)
);


insert into cura (haljina,drugiputa,suknja,narukvica,introvertno,majica) values

('večernja','2023-12-02','mini',15,0,'T-shirt'),
('poslovna','2023-12-10','duga',12,1,'kratka'),
('casual', '2023-10-15', 'kratka',8,0,'na bretele');

insert into neprijatelj (majica,haljina,lipa,modelnaocala,kuna,jmbg,cura) values

('plava','bež',126.54,'cvoke',8561.36,'57986325974',1),
('zelena','plava',325.44,'zlx',4269.74,'19675593647',2),
('crvena','žuta',8451.39,'police',342.88,'65132632548',3);


insert into decko (indiferentno,vesta,asocijalno) values

(1,'zabavna',0),
(0,'topla',1),
(1,'lagana',1);

insert into zarucnica (bojakose,lipa,indiferentno) values

('smeđa',345.21,1),
('plava',259.64,0),
('crna',487.36,1);


insert into decko_zarucnica (decko,zarucnica) values

(1,1),
(2,2),
(3,3);

insert into brat (ogrlica,asocijalno,neprijatelj) values

(14,1,1),
(17,0,2),
(12,1,3);

insert into svekar (stilfrizura,ogrlica,asocijalno) values

('kratko',26,1),
('nulerica',13,0),
('talijanka',28,1);

insert into prijatelj (treciputa,ekstrovertno,svekar) values

('2023-11-14',1,1),
('2023-10-03',1,2),
('2023-12-01',1,3);

update prijatelj set treciputa='2020-04-30';

select * from prijatelj;

delete from brat where ogrlica!=14;

select * from cura;

select suknja from cura where drugiputa is null;

select a.novcica, e.haljina, f.neprijatelj
from zarucnica a inner join decko_zarucnica b
on a.sifra=b.zarucnica
inner join decko c on c.sifra=b.decko 
inner join cura d on c.sifra=d.decko
inner join neprijatelj e on d.sifra=e.cura
inner join brat f on e.sifra=f.neprijatelj
where d.drugiputa is not null and c.vesta like '%ba%'
order by e.haljina desc;


select a.asocijalno, a.vesta
from decko a inner join decko_zarucnica b
on a.sifra=b.decko
where b.decko is null;