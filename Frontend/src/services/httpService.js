import axios from "axios";

export const httpService = axios.create({
    baseURL: 'https://korisnik117-001-site1.itempurl.com/api/v1',
    headers:{
        'Content-Type' : 'application/json; charset=utf-8'
    }
});