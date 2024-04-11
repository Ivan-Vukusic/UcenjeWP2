import { httpService, obradiGresku, obradiUspjeh, get,obrisi,dodaj,getBySifra,promjeni } from "./httpService";

async function postaviSliku(sifra, slika) {
    return await httpService.put('/Djelatnik/postaviSliku/' + sifra, slika).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
  }

export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra,
    postaviSliku    
};