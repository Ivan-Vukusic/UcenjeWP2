import { App } from "../constants";
import { httpService } from "./httpService";

async function getOtrovi(){
    return await httpService.get('/Otrov')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function getBySifra(sifra){
    return await httpService.get('/Otrov/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}

async function dodajOtrov(otrov){
    const odgovor = await httpService.post('/Otrov', otrov)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniOtrov(sifra,otrov){
    const odgovor = await httpService.put('/Otrov/' + sifra, otrov)
    .then(()=>{
        return {ok: true, poruka: 'Uspješna promjena'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function obrisiOtrov(sifra){
    return await httpService.delete('/Otrov/' + sifra)
    .then((res)=>{
        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

export default{
    getOtrovi,
    dodajOtrov,
    promjeniOtrov,
    getBySifra,
    obrisiOtrov
}; 