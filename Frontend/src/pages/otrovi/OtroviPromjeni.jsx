import { useEffect, useState } from 'react';
import { Container, Form} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import OtrovService from '../../services/OtrovService';
import { RoutesNames } from '../../constants';
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function OtroviPromjeni(){

    const [otrov,setOtrov] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
    const { prikaziError } = useError();    
    const { showLoading, hideLoading } = useLoading();
        
    async function dohvatiOtrov(){
        showLoading(); 
        const odgovor = await OtrovService.getBySifra('Otrov', routeParams.sifra)
        if(!odgovor.ok){
            hideLoading();
            prikaziError(odgovor.podaci);              
            return;
        }
        setOtrov(odgovor.podaci);
        hideLoading();        
    }

    useEffect(()=>{
        dohvatiOtrov();
    },[]);

    async function promjeniOtrov(otrov){
        showLoading(); 
        const odgovor = await OtrovService.promjeni('Otrov',routeParams.sifra, otrov);
        if(odgovor.ok){
            hideLoading(); 
            navigate(RoutesNames.OTROVI_PREGLED);                       
            return;
          }
          alert(dohvatiPorukeAlert(odgovor.podaci));
          hideLoading();          
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        promjeniOtrov({            
            naziv: podaci.get('naziv'),
            aktivnaTvar: podaci.get('aktivnaTvar'),
            kolicina: parseFloat (podaci.get('kolicina')),
            casBroj: podaci.get('casBroj')      
          });          
    }

    return(
        
        <Container>
            
          <Form onSubmit={handleSubmit}>
          <InputText atribut='Naziv otrova' vrijednost={otrov.naziv} />
          <InputText atribut='Aktivna tvar u otrovu' vrijednost={otrov.aktivnaTvar} />
          <InputText atribut='Količina otrova' vrijednost={otrov.kolicina} />
          <InputText atribut='CAS broj' vrijednost={otrov.casBroj} />                          
          <Akcije odustani={RoutesNames.OTROVI_PREGLED} akcija='Promjeni otrov' />
          </Form>

        </Container>
        
    ) 

}