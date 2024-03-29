import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import TerminService from "../../services/TerminService";
import DjelatnikService from "../../services/DjelatnikService";
import ObjektService from "../../services/ObjektService";
import OtrovService from "../../services/OtrovService";
import { RoutesNames } from "../../constants";



export default function TerminiDodaj(){
    const navigate = useNavigate();

    const [djelatnici, setDjelatnici] = useState([]);
    const [djelatnikSifra, setDjelatnikSifra] = useState(0);

    const [objekti, setObjekti] = useState([]);
    const [objektSifra, setObjektSifra] = useState(0);

    const [otrovi, setOtrovi] = useState([]);
    const [otrovSifra, setOtrovSifra] = useState(0);

    async function dohvatiDjelatnike(){
        await DjelatnikService.getDjelatnici().
          then((odgovor)=>{
            setDjelatnici(odgovor.data);
            setDjelatnikSifra(odgovor.data[0].sifra);
          });
    }

    async function dohvatiObjekte(){
        await ObjektService.get().
          then((odgovor)=>{
            setObjekti(odgovor.data);
            setObjektSifra(odgovor.data[0].sifra);
          });
    }

    async function dohvatiOtrove(){
        await OtrovService.getOtrovi().
          then((odgovor)=>{
            setOtrovi(odgovor.data);
            setOtrovSifra(odgovor.data[0].sifra);
          });
    }

    async function ucitaj(){
        await dohvatiDjelatnike();
        await dohvatiObjekte();
        await dohvatiOtrove();
    }
    
    useEffect(()=>{
        ucitaj();
    },[]);

    async function dodaj(e) {        
    
        const odgovor = await TerminService.dodaj(e);
        if (odgovor.ok) {
          navigate(RoutesNames.TERMINI_PREGLED);
        } else {
          alert(odgovor.poruka.errors);
        }
        
    }
    
    function handleSubmit(e) {
        e.preventDefault();
    
        const podaci = new FormData(e.target);                
    
        dodaj({
          datum: podaci.get('datum'),          
          djelatnikSifra: parseInt(djelatnikSifra),
          objektSifra: parseInt(objektSifra),
          otrovSifra: parseInt(otrovSifra),
          napomena: podaci.get('napomena')
        });        
      }
    
      return (

      <Container>
            
      <Form onSubmit={handleSubmit}>
        
          <Form.Group controlId='datum'>
              <Form.Label>Datum</Form.Label>
              <Form.Control
                  type='date'
                  name='datum'
                  placeholder='Datum termina'                  
                  required
              />                    
          </Form.Group>            

          <Form.Group controlId='djelatnik'>
              <Form.Label>Djelatnik</Form.Label>
                  <Form.Select 
                  onChange={(e) => {setDjelatnikSifra(e.target.value)}}
                  >                                            
                  {djelatnici && djelatnici.map((d,index)=>(
                  <option key={index} value={d.sifra}>
                  {d.ime} {d.prezime}
                  </option>
                  ))}
              </Form.Select>                    
          </Form.Group>                

          <Form.Group controlId='objekt'>
              <Form.Label>Objekt</Form.Label>
                  <Form.Select 
                  onChange={(e) => {setObjektSifra(e.target.value)}}
                  >                                            
                  {objekti && objekti.map((o,index)=>(
                  <option key={index} value={o.sifra}>
                  {o.mjesto}, {o.adresa}
                  </option>
                  ))}
              </Form.Select>                    
          </Form.Group>   

          <Form.Group controlId='otrov'>
              <Form.Label>Otrov</Form.Label>
                  <Form.Select 
                  onChange={(e) => {setOtrovSifra(e.target.value)}}
                  >                                            
                  {otrovi && otrovi.map((o,index)=>(
                  <option key={index} value={o.sifra}>
                  {o.naziv} 
                  </option>
                  ))}
              </Form.Select>                    
          </Form.Group>  

          <Form.Group controlId='napomena'>
          <Form.Label>Napomena</Form.Label>
          <Form.Control
            type='text'
            name='napomena'
            placeholder='Napomena'             
          />
        </Form.Group>                           

          <Row>
              <Col>
                  <Link 
                  className='btn btn-danger pomjeri'
                  to={RoutesNames.TERMINI_PREGLED}>Odustani</Link>
              </Col>
              <Col>
                  <Button
                      className='pomjeri'
                      variant='primary'
                      type='submit'
                  >
                      Dodaj termin
                  </Button>
              </Col>
          </Row>

      </Form>

  </Container>   

 
);

}