import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VrstaService from '../../services/VrstaService';
import { RoutesNames } from '../../constants';

export default function VrstePromjeni(){

    const [vrsta,setVrstu] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
        
    async function dohvatiVrstu(){
        await VrstaService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setVrstu(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);            
        })
    }

    useEffect(()=>{
        dohvatiVrstu();
    },[]);

    async function promjeniVrstu(vrsta){
        const odgovor = await VrstaService.promjeniVrstu(routeParams.sifra, vrsta);
        if (odgovor.ok){
            navigate(RoutesNames.VRSTE_PREGLED);
          }else{
            console.log(odgovor);
            alert(odgovor.poruka);
          }
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        const vrsta =
        {            
            naziv: podaci.get('naziv')                        
          };

          promjeniVrstu(vrsta);
    }

    return(
        
        <Container>
            
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId='naziv'>
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={vrsta.naziv}
                        name='naziv'                        
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
                            Promjeni vrstu objekta
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>
        
    ) 

}