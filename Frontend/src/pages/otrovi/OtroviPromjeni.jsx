import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OtrovService from '../../services/OtrovService';
import { RoutesNames } from '../../constants';

export default function OtroviPromjeni(){

    const [otrov,setOtrov] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
        
    async function dohvatiOtrov(){
        await OtrovService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setOtrov(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);            
        })
    }

    useEffect(()=>{
        dohvatiOtrov();
    },[]);

    async function promjeniOtrov(otrov){
        const odgovor = await OtrovService.promjeniOtrov(routeParams.sifra, otrov);
        if (odgovor.ok){
            navigate(RoutesNames.OTROVI_PREGLED);
          }else{
            console.log(odgovor);
            alert(odgovor.poruka);
          }
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        const otrov =
        {            
            naziv: podaci.get('naziv'),
            aktivnaTvar: podaci.get('aktivnaTvar'),
            kolicina: podaci.get('kolicina'),
            casBroj: podaci.get('casBroj')            
          };

          promjeniOtrov(otrov);
    }

    return(
        
        <Container>
            
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId='naziv'>
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={otrov.naziv}
                        name='naziv'                        
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='aktivnaTvar'>
                    <Form.Label>Aktivna tvar</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={otrov.aktivnaTvar}
                        name='aktivnaTvar'                       
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='kolicina'>
                    <Form.Label>Količina</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={otrov.kolicina}
                        name='kolicina'                       
                    />                    
                </Form.Group>

                <Form.Group controlId='casBroj'>
                    <Form.Label>CAS broj</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={otrov.casBroj}
                        name='casBroj'                                               
                    />                    
                </Form.Group>             

                <Row>
                    <Col>
                        <Link 
                        className='btn btn-danger pomjeri'
                        to={RoutesNames.OTROVI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            className='pomjeri'
                            variant='primary'
                            type='submit'
                        >
                            Promjeni otrov
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>
        
    ) 

}