import { useEffect, useState } from "react";
import { Button, Container, Table, Row, Col, Card } from "react-bootstrap";
import DjelatnikService from "../../services/DjelatnikService";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import slika1 from '../assets/images/slika1.jpg';
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function Djelatnici(){

    const [djelatnici,setDjelatnici] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();    
    const { showLoading, hideLoading } = useLoading();  

    async function dohvatiDjelatnike(){
        showLoading();
        const odgovor = await DjelatnikService.get('Djelatnik');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setDjelatnici(odgovor.podaci);
        hideLoading();
    }

    async function obrisiDjelatnika(sifra){
        showLoading();
        const odgovor = await DjelatnikService.obrisi('Djelatnik',sifra);
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiDjelatnike();
        }
        hideLoading();
    }

    useEffect(()=>{
        dohvatiDjelatnike();
    },[]);  
    
    function slika(djelatnik){
        if(djelatnik.slika!=null){
            return App.URL + djelatnik.slika+ `?${Date.now()}`;
        }
        return slika1;
    }

    return (

        <Container>
            <Link to={RoutesNames.DJELATNICI_NOVI} className="btn btn-success gumb">                
            <IoPersonAddSharp   
                size={35}                
            /> Dodaj djelatnika
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Ime</th>
                        <th className="sredina">Prezime</th>
                        <th className="sredina">Broj mobitela</th>
                        <th className="sredina">OIB</th>
                        <th className="sredina">Struka</th>
                        <th className="sredina">Mogućnosti</th>
                    </tr>
                </thead>
                <tbody>
                    {djelatnici && djelatnici.map((djelatnik, index)=>(
                        <tr key={index}>
                            <td className="sredina">{djelatnik.ime}</td>
                            <td className="sredina">{djelatnik.prezime}</td>
                            <td className="sredina">{djelatnik.brojMobitela}</td>
                            <td className="sredina">{djelatnik.oib}</td>
                            <td className="sredina">{djelatnik.struka}</td>
                            <td className="sredina">
                                <Button 
                                    variant="primary"
                                onClick={()=>{navigate(`/djelatnici/${djelatnik.sifra}`)}}>                
                                    <FaRegEdit   
                                    size={35}                
                                    />
                                </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiDjelatnika(djelatnik.sifra)}
                                >                
                                    <RiDeleteBinLine    
                                    size={35}                
                                    />
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
           
            <Row>
                
            { djelatnici && djelatnici.map((d) => (
           
           <Col key={d.sifra} sm={12} lg={3} md={3}>
              <Card style={{ marginTop: '1rem' }}>
              <Card.Img variant="top" src={slika(d)} className="slika"/>
                <Card.Body>
                  <Card.Title>{d.ime} {d.prezime}</Card.Title>
                  <Card.Text>
                    {d.struka}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/djelatnici/${d.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => obrisiDjelatnika(d.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>
        </Container>

    );

}