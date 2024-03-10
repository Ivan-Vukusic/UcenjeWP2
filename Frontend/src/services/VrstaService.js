import { App } from "../constants";
import { httpService } from "./httpService";

async function getVrste(){
    return await httpService.get('/Vrsta')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function getBySifra(sifra){
    return await httpService.get('/Vrsta/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}

async function dodajVrstu(vrsta){
    const odgovor = await httpService.post('/Vrsta', vrsta)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniVrstu(sifra,vrsta){
    const odgovor = await httpService.put('/Vrsta/' + sifra, vrsta)
    .then(()=>{
        return {ok: true, poruka: 'Uspješna promjena'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function obrisiVrstu(sifra){
    return await httpService.delete('/Vrsta/' + sifra)
    .then((res)=>{
        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

export default{
    getVrste,
    dodajVrstu,
    promjeniVrstu,
    getBySifra,
    obrisiVrstu
}; 