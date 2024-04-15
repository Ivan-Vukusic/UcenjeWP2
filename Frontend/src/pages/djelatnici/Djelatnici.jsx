import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import DjelatnikService from "../../services/DjelatnikService";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RoutesNames, App } from "../../constants";
import slika2 from "../../assets/images/slika2.png"
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function Djelatnici() {

    const [djelatnici, setDjelatnici] = useState();    
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiDjelatnike() {
        showLoading();
        const odgovor = await DjelatnikService.get('Djelatnik');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setDjelatnici(odgovor.podaci);
        hideLoading();
    }

    async function obrisiDjelatnika(sifra) {
        showLoading();
        const odgovor = await DjelatnikService.obrisi('Djelatnik', sifra);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiDjelatnike();
        }
        hideLoading();
    }

    useEffect(() => {
        dohvatiDjelatnike();
    }, []);

    function slika(djelatnik) {
        if (djelatnik.slika != null) {
            return App.URL + djelatnik.slika + `?${Date.now()}`;
        }
        return slika2;
    }

    return (

        <Container>
            <Link to={RoutesNames.DJELATNICI_NOVI} className="btn btn-success gumb">
                <IoPersonAddSharp
                    size={35}
                /> Dodaj djelatnika
            </Link>


            <Row>

                {djelatnici && djelatnici.map((d) => (

                    <Col key={d.sifra} sm={12} lg={3} md={3}>
                        <Card style={{ marginTop: '1rem' }}>
                            <Card.Img variant="top" src={slika(d)} className="slika" />
                            <Card.Body>
                                <Card.Title>{d.ime} {d.prezime}</Card.Title>
                                <Card.Text>
                                    {d.struka}
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Link className="btn btn-primary gumb" to={`/djelatnici/${d.sifra}`}><FaRegEdit /></Link>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" className="gumb" onClick={() => obrisiDjelatnika(d.sifra)}><RiDeleteBinLine /></Button>
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