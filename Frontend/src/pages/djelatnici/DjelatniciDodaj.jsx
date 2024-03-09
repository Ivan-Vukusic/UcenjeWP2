import { Button, Col, Container, Form, Row, } from 'react-bootstrap';
import {  Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import DjelatnikService from '../../services/DjelatnikService';

export default function DjelatniciDodaj(){
    const navigate = useNavigate();

    async function dodajDjelatnika(djelatnik){
        const odgovor = await DjelatnikService.dodajDjelatnika(djelatnik);
        if (odgovor.ok){
            navigate(RoutesNames.DJELATNICI_PREGLED);
          }else{
            console.log(odgovor);
            alert(odgovor.poruka);
          }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);        
        
        const djelatnik =
        {            
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojMobitela: podaci.get('brojMobitela'),
            oib: podaci.get('oib'),
            struka: podaci.get('struka')
          };

          dodajDjelatnika(djelatnik);

    }

    return(

        <Container>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='ime'>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type='text'
                        name='ime'
                        placeholder='Ime djelatnika'
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='prezime'>
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type='text'
                        name='prezime'
                        placeholder='Prezime djelatnika'
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='brojMobitela'>
                    <Form.Label>Broj mobitela</Form.Label>
                    <Form.Control
                        type='text'
                        name='brojMobitela'
                        placeholder='Broj mobitela djelatnika'
                    />                    
                </Form.Group>

                <Form.Group controlId='oib'>
                    <Form.Label>OIB</Form.Label>
                    <Form.Control
                        type='text'
                        name='oib'
                        placeholder='OIB djelatnika'
                        maxLength={11}
                    />                    
                </Form.Group>

                <Form.Group controlId='struka'>
                    <Form.Label>Struka</Form.Label>
                    <Form.Control
                        type='text'
                        name='struka'
                        placeholder='Struka djelatnika'
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
                            Dodaj djelatnika
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>

    ) 

}