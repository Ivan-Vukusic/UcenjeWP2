import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import TerminService from "../../services/TerminService";
import DjelatnikService from "../../services/DjelatnikService";
import ObjektService from "../../services/ObjektService";
import OtrovService from "../../services/OtrovService";
import { RoutesNames } from "../../constants";



export default function TerminiPromjeni(){
        
    const routeParams = useParams();
    const navigate = useNavigate();
    const [termin, setTermin] = useState({});

    const [djelatnici, setDjelatnici] = useState([]);
    const [djelatnikSifra, setDjelatnikSifra] = useState(0);

    const [objekti, setObjekti] = useState([]);
    const [objektSifra, setObjektSifra] = useState(0);

    const [otrovi, setOtrovi] = useState([]);
    const [otrovSifra, setOtrovSifra] = useState(0);

    async function get(){
        await TerminService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setTermin(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);            
        })
    }

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
        await get();
        await dohvatiDjelatnike();
        await dohvatiObjekte();
        await dohvatiOtrove();
    }
    
    useEffect(()=>{
        ucitaj();
    },[]);

    async function promjeni(termin){
        const odgovor = await TerminService.promjeni(routeParams.sifra, termin);
        if (odgovor.ok){
            navigate(RoutesNames.TERMINI_PREGLED);
          }else{
            console.log(odgovor);
            alert(odgovor.poruka);
          }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
    
        const podaci = new FormData(e.target);                
    
        promjeni({
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
                  defaultValue={termin.datum}                                    
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
            defaultValue={termin.napomena}
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
                      Promjeni termin
                  </Button>
              </Col>
          </Row>

      </Form>

  </Container>   

 
);

}