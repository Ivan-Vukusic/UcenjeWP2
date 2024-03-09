import { Button, Col, Container, Form, Row, } from 'react-bootstrap';
import {  Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import OtrovService from '../../services/OtrovService';

export default function OtroviDodaj(){
    const navigate = useNavigate();

    async function dodajOtrov(otrov){
        const odgovor = await OtrovService.dodajOtrov(otrov);
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
            kolicina: parseFloat (podaci.get('kolicina')),
            casBroj: podaci.get('casBroj')            
          };

          dodajOtrov(otrov);

    }

    return(

        <Container>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='naziv'>
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control
                        type='text'
                        name='naziv'
                        placeholder='Naziv otrova'
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='aktivnaTvar'>
                    <Form.Label>Aktivna Tvar</Form.Label>
                    <Form.Control
                        type='text'
                        name='aktivnaTvar'
                        placeholder='Aktivna tvar otrova'
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='kolicina'>
                    <Form.Label>Količina</Form.Label>
                    <Form.Control
                        type='text'
                        name='kolicina'
                        placeholder='Količina otrova'
                    />                    
                </Form.Group>

                <Form.Group controlId='casBroj'>
                    <Form.Label>CAS broj</Form.Label>
                    <Form.Control
                        type='text'
                        name='casBroj'
                        placeholder='CAS broj otrova'                        
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
                            Dodaj otrov
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>

    ) 

}