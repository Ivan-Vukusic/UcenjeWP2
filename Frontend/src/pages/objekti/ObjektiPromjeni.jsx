import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ObjektService from '../../services/ObjektService';
import { RoutesNames } from '../../constants';

export default function ObjektiPromjeni(){

    const [objekt,setObjekt] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();
        
    async function dohvatiObjekt(){
        await ObjektService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setObjekt(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);            
        })
    }

    useEffect(()=>{
        dohvatiObjekt();
    },[]);

    async function promjeni(objekt){
        const odgovor = await ObjektService.promjeni(routeParams.sifra, objekt);
        if (odgovor.ok){
            navigate(RoutesNames.OBJEKTI_PREGLED);
          }else{
            console.log(odgovor);
            alert(odgovor.poruka);
          }
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        promjeni({
            mjesto: podaci.get('mjesto'),
            adresa: podaci.get('adresa'),            
            vrstaSifra: parseInt('vrstaSifra')            
        });
    }

    return(
        
        <Container>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='mjesto'>
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control
                        type='text'
                        name='mjesto'
                        defaultValue={objekt.mjesto}
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='adresa'>
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                        type='text'
                        name='adresa'
                        defaultValue={objekt.adresa}
                        required
                    />                    
                </Form.Group>                

                <Form.Group controlId='vrstaSifra'>
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control
                        type='text'
                        name='vrstaSifra'
                        defaultValue={objekt.vrstaSifra}
                        required
                    />                    
                </Form.Group>

                <Row>
                    <Col>
                        <Link 
                        className='btn btn-danger pomjeri'
                        to={RoutesNames.OBJEKTI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            className='pomjeri'
                            variant='primary'
                            type='submit'
                        >
                            Promjeni objekt
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>
        
    ) 

}