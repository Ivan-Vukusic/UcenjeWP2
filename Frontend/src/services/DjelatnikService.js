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

export default{
    getDjelatnici,
    
}; 