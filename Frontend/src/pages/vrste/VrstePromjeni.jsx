import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VrstaService from '../../services/VrstaService';
import { RoutesNames } from '../../constants';
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function VrstePromjeni(){

    const [vrsta,setVrstu] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
    const { prikaziError } = useError();    
    const { showLoading, hideLoading } = useLoading();
        
    async function dohvatiVrstu(){ 
        showLoading();       
        const odgovor = await VrstaService.getBySifra('Vrsta',routeParams.sifra)
        if(!odgovor.ok){
            hideLoading();
            prikaziError(odgovor.podaci);              
            return;
        }
        setVrstu(odgovor.podaci);
        hideLoading();          
    }

  useEffect(()=>{
      dohvatiVrstu();
  },[]);

  async function promjeniVrstu(vrsta){ 
        showLoading();       
        const odgovor = await VrstaService.promjeni('Vrsta',routeParams.sifra, vrsta);
        if(odgovor.ok){
          hideLoading();
          navigate(RoutesNames.VRSTE_PREGLED);            
          return;
        }
        alert(dohvatiPorukeAlert(odgovor.podaci));
        hideLoading();          
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        promjeniVrstu({            
            naziv: podaci.get('naziv')                        
          });          
    }

    return(
        
        <Container>
            
          <Form onSubmit={handleSubmit}>
          <InputText atribut='naziv' vrijednost={vrsta.naziv} />                                    
          <Akcije odustani={RoutesNames.VRSTE_PREGLED} akcija='Promjeni vrstu objekta' />
          </Form>

        </Container>
        
    ) 

}