import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Modal, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DjelatnikService from '../../services/DjelatnikService';
import { RoutesNames } from '../../constants';
import useError from "../../hooks/useError";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from "../../hooks/useLoading";

export default function DjelatniciPromjeni(){

    const [djelatnik,setDjelatnik] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const [prikaziModal, setPrikaziModal] = useState(false);
    const { showLoading, hideLoading } = useLoading();
        
    async function dohvatiDjelatnika(){ 
        showLoading();       
        const odgovor = await DjelatnikService.getBySifra('Djelatnik',routeParams.sifra)
          if(!odgovor.ok){
              prikaziError(odgovor.podaci);
              navigate(RoutesNames.DJELATNICI_PREGLED);
              return;
          }
          setDjelatnik(odgovor.podaci);
          hideLoading();          
      }

    useEffect(()=>{
        dohvatiDjelatnika();
    },[]);

    async function promjeniDjelatnika(djelatnik){
        showLoading();        
          const odgovor = await DjelatnikService.promjeni('Djelatnik',routeParams.sifra, djelatnik);
          if(odgovor.ok){
            navigate(RoutesNames.DJELATNICI_PREGLED);
            hideLoading();            
            return;
          }
          prikaziError(odgovor.podaci);
          hideLoading();          
      }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        promjeniDjelatnika({            
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojMobitela: podaci.get('brojMobitela'),
            oib: podaci.get('oib'),
            struka: podaci.get('struka')
          });          
    }

    function zatvoriModal(){
        setPrikaziModal(false);
    }

    return(
        
        <Container>
           <Form onSubmit={handleSubmit}>
                <InputText atribut='ime' vrijednost={djelatnik.ime} />
                <InputText atribut='prezime' vrijednost={djelatnik.prezime} />
                <InputText atribut='brojMobitela' vrijednost={djelatnik.brojMobitela} />
                <InputText atribut='oib' vrijednost={djelatnik.oib} />
                <InputText atribut='struka' vrijednost={djelatnik.struka} />                
                <Akcije odustani={RoutesNames.DJELATNICI_PREGLED} akcija='Promjeni djelatnika' />
           </Form>
        </Container>
        
    ) 

}