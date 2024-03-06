import { App } from "../constants"
import { httpService } from "./httpService";

async function getDjelatnici(){
    return await httpService.get('/Djelatnik')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function getBySifra(sifra){
    return await httpService.get('/Djelatnik/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res.data;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}

async function dodajDjelatnika(djelatnik){
    const odgovor = await httpService.post('/Djelatnik', djelatnik)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniDjelatnika(sifra,djelatnik){
    const odgovor = await httpService.put('/Djelatnik/'+sifra, djelatnik)
    .then(()=>{
        return {ok: true, poruka: 'Uspješna promjena'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function obrisiDjelatnika(sifra){
    return await httpService.delete('/Djelatnik/' + sifra)
    .then((res)=>{
        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

export default{
    getDjelatnici,
    dodajDjelatnika,
    promjeniDjelatnika,
    getBySifra,
    obrisiDjelatnika
}; 