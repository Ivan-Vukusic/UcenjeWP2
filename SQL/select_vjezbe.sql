-- select lista nalazi se između select i from

-- filtriranje kolona

-- * sve kolone
select * from smjerovi;

-- nazivi kolona
select naziv, cijena from smjerovi;

-- konstanta
select naziv, 'Osijek', 8, 9.8 from smjerovi;

-- kolonama se može dati zamjensko ime
select naziv as smjer, 'Osijek' as grad from smjerovi;

-- izraz
select naziv, len(naziv) as duzina, 
getdate() as datum from smjerovi;

-- najjednostavniji select
select 1;

-- najkompliciranji primjer
select sifra as s, naziv as n, 'Edunova' as skola,
len(naziv) as duzina, * from smjerovi;

-- filtriranje redova - where dio

select * from smjerovi where sifra=1;

-- operatori
-- uspoređivanje = > >= < <= !=
select * from polaznici where sifra!=7;

select * from polaznici where ime='Ivan';

select * from grupe where datumpocetka>'2023-09-01';

-- logičke operatori: and, or
select * from polaznici where
not (ime='Ivan' or ime='Ivor');

-- ostali operatori: like
select * from polaznici where ime not like '%a%';

-- koji su polaznici s početnim slovom prezimena B
select * from polaznici where prezime like 'B%žić';

-- kaladont
select * from polaznici where prezime like '%nt';

select * from polaznici where 
sifra=2 or sifra=4 or sifra=7;

-- jednostavnija sintaksa
select * from polaznici where sifra in (2,4,7);

select * from polaznici where
sifra>=6 and sifra<=10;

-- jednostavnija sintaksa
select * from polaznici where
 sifra between 6 and 10;

select * from grupe where
datumpocetka between '2023-01-01' and '2023-12-31';

-- na null vrijednosti u tavlicama ne može se primjenjivati niti jedan prethodno opisan operator
select * from smjerovi where brojsati=NULL;

-- koristi se: is null, is not null
select * from smjerovi where brojsati is not null;

select isnull(brojsati,30) as bs from smjerovi;


-- slaganje podataka

select * from polaznici order by prezime desc, 2 desc;

-- limitiranje podataka

select top 10 * from polaznici;

select top 10 percent * from polaznici;


select ime as djever, brojugovora as racun 
into nova
from polaznici; 


select * from nova;

drop table nova;

----------------------------------------
--- BAZA knjiznica

-- izlistajte imena i prezimena autora

select ime, prezime from autor;

-- koliko ima redova u tablici autor

select count(*) from autor;

-- izlistajte sve autore koji su rođeni u 
-- Vašoj godini rođenja

select * from autor where datumrodenja between '1985-01-01' and '1985-12-31';

-- unesite sebe kao autora

insert into autor (sifra,ime,prezime,datumrodenja) 
values (4,'Ivan','Vukušić','1985-02-20');

-- Mladića je ostavila djevojka i on pati
-- Moli pomoć knjižničarke koje knjige da 
-- posudi kako bi ju prebolio

select * from katalog where (naslov like '%bol%' or naslov like '%ljubav%')
and sifra not in (2541,2596,2664,2680,2752,2784,2981,3160);

select * from katalog where (naslov like '%rat%' or naslov like '%kralj%');

-- islistajte sve neaktivne izdavače

select * from izdavac where aktivan=0;

-- izlistajte sve izdavače koji su
-- društva s ograničenom odgovornošću

select * from izdavac where naziv like '%d.o.o%' or naziv like '%d%o%o%';

-- Izlistajte sva mjesta u osječko baranjskoj županiji

select * from mjesto where postanskiBroj like '31%';


-- S najmanjom pogreškom
-- islistajte sve autorice

select * from autor where ime like '%a';

-- jedinstveni rezultati

select distinct ime from autor where ime like '%a';
