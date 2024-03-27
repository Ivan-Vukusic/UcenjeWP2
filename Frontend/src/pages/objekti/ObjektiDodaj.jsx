import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Service from '../../services/ObjektService';
import VrstaService from '../../services/VrstaService';
import { RoutesNames } from '../../constants';



export default function ObjektiDodaj() {
  const navigate = useNavigate();

  const [vrste, setVrste] = useState([]);  
  const [vrstaSifra, setVrstaSifra] = useState(0);

  async function dohvatiVrste(){
    await VrstaService.getVrste().
      then((odgovor)=>{
        setVrste(odgovor.data);
        setVrstaSifra(odgovor.data[0].sifra);
      });
  } 

  async function ucitaj(){
    await dohvatiVrste();    
  }

  useEffect(()=>{
    ucitaj();
  },[]);

  async function dodaj(e) {    

    const odgovor = await Service.dodaj(e);
    if (odgovor.ok) {
      navigate(RoutesNames.OBJEKTI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
    
  }

  function handleSubmit(e){
    e.preventDefault();

    const podaci = new FormData(e.target);        
    
    dodaj({
        mjesto: podaci.get('mjesto'),
        adresa: podaci.get('adresa'),
        vrstaSifra: parseInt(vrstaSifra)
    });
    
  }


  return (

    <Container>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='mjesto'>
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control
                        type='text'
                        name='mjesto'
                        placeholder='Mjesto'
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='adresa'>
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                        type='text'
                        name='adresa'
                        placeholder='Adresa'
                        required
                    />                    
                </Form.Group>

                <Form.Group controlId='vrsta'>
                    <Form.Label>Vrsta</Form.Label>
                        <Form.Select 
                        onChange={(e) => {setVrstaSifra(e.target.value)}}
                        >                                            
                        {vrste && vrste.map((v,index)=>(
                        <option key={index} value={v.sifra}>
                        {v.naziv}
                        </option>
                        ))}
                    </Form.Select>                    
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
                            Dodaj objekt
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>   

       
  );
}