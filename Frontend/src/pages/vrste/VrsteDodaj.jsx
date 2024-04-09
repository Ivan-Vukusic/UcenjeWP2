import { Button, Col, Container, Form, Row, } from 'react-bootstrap';
import {  Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import VrstaService from '../../services/VrstaService';

export default function VrsteDodaj(){
    const navigate = useNavigate();

    async function dodajVrstu(vrsta){
        
        const odgovor = await VrstaService.dodaj('Vrsta', vrsta);
        if(odgovor.ok){
          navigate(RoutesNames.VRSTE_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
        
    }

    function handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);        
        
        dodajVrstu({            
            naziv: podaci.get('naziv')                        
        });
    }

    return(

        <Container>
            
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId='naziv'>
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control
                        type='text'
                        name='naziv'
                        placeholder='Naziv vrste objekta'
                        required
                    />                    
                </Form.Group>

                <Row>
                    <Col>
                        <Link 
                        className='btn btn-danger pomjeri'
                        to={RoutesNames.VRSTE_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            className='pomjeri'
                            variant='primary'
                            type='submit'
                        >
                            Dodaj vrstu objekta
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>

    ) 

}