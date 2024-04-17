import { httpService, obradiGresku, obradiUspjeh, get, obrisi, dodaj, getBySifra, promjeni } from "./httpService";

async function traziDjelatnik(naziv, uvjet) {
  return await httpService.get('/' + naziv + '/trazi/' + uvjet).then((res) => { return obradiUspjeh(res); }).catch((e) => { return obradiGresku(e); });
}

async function postaviSliku(sifra, slika) {
  return await httpService.put('/Djelatnik/postaviSliku/' + sifra, slika).then((res) => { return obradiUspjeh(res); }).catch((e) => { return obradiGresku(e); });
}

async function getStranicenje(stranica, uvjet) {
  return await httpService.get('/Djelatnik/traziStranicenje/' + stranica + '?uvjet=' + uvjet)
    .then((res) => { return obradiUspjeh(res); }).catch((e) => { return obradiGresku(e); });
}

export default {
  get,
  obrisi,
  dodaj,
  promjeni,
  getBySifra,
  traziDjelatnik,
  postaviSliku,
  getStranicenje
};