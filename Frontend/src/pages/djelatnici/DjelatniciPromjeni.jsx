import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DjelatnikService from '../../services/DjelatnikService';
import { RoutesNames } from '../../constants';

export default function DjelatniciPromjeni(){

    const [djelatnik,setDjelatnik] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
        
    async function dohvatiDjelatnika(){        
          const odgovor = await DjelatnikService.getBySifra('Djelatnik',routeParams.sifra)
          if(!odgovor.ok){
              prikaziError(odgovor.podaci);
              navigate(RoutesNames.DJELATNICI_PREGLED);
              return;
          }
          setDjelatnik(odgovor.podaci);          
      }

    useEffect(()=>{
        dohvatiDjelatnika();
    },[]);

    async function promjeniDjelatnika(djelatnik){        
          const odgovor = await DjelatnikService.promjeni('Djelatnik',routeParams.sifra, djelatnik);
          if(odgovor.ok){
            navigate(RoutesNames.DJELATNICI_PREGLED);            
            return;
          }
          prikaziError(odgovor.podaci);          
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

    return(
        
        <Container>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='ime'>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={djelatnik.ime}
                        name='ime'
                    />                    
                </Form.Group>

                <Form.Group controlId='prezime'>
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={djelatnik.prezime}
                        name='prezime'
                    />                    
                </Form.Group>

                <Form.Group controlId='brojMobitela'>
                    <Form.Label>Broj mobitela</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={djelatnik.brojMobitela}
                        name='brojMobitela'
                    />                    
                </Form.Group>

                <Form.Group controlId='oib'>
                    <Form.Label>OIB</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={djelatnik.oib}
                        name='oib'
                        maxLength={11}
                    />                    
                </Form.Group>

                <Form.Group controlId='struka'>
                    <Form.Label>Struka</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={djelatnik.struka}
                        name='struka'
                    />                    
                </Form.Group>

                <Row>
                    <Col>
                        <Link 
                        className='btn btn-danger pomjeri'
                        to={RoutesNames.DJELATNICI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            className='pomjeri'
                            variant='primary'
                            type='submit'
                        >
                            Promjeni djelatnika
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>
        
    ) 

}