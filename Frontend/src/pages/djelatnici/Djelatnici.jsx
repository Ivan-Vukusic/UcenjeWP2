import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Modal, Form, Pagination } from "react-bootstrap";
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

    const [djelatnici, setDjelatnici] = useState([]);
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();
    const [prikaziModal, setPrikaziModal] = useState(false);

    async function dohvatiDjelatnike() {
        showLoading();
        const odgovor = await DjelatnikService.getStranicenje(stranica, uvjet);
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        if (odgovor.podaci.length == 0) {
            setStranica(stranica - 1);
            hideLoading();
            return;
        }
        setDjelatnici(odgovor.podaci);
        hideLoading();
    }

    async function obrisiDjelatnika(sifra) {
        showLoading();
        const odgovor = await DjelatnikService.obrisi('Djelatnik', sifra);
        hideLoading();
        if (odgovor.ok) {
            dohvatiDjelatnike();
            setPrikaziModal(true);
        } else {
            prikaziError(odgovor.podaci);
        }
        hideLoading();
    }

    function zatvoriModal() {
        setPrikaziModal(false);
    }

    useEffect(() => {
        dohvatiDjelatnike();
    }, [stranica, uvjet]);

    function slika(djelatnik) {
        if (djelatnik.slika != null) {
            return App.URL + djelatnik.slika + `?${Date.now()}`;
        }
        return slika2;
    }

    function promjeniUvjet(e) {
        if (e.nativeEvent.key == "Enter") {
            setStranica(1);
            setUvjet(e.nativeEvent.srcElement.value);
            setDjelatnici([]);
        }
    }

    function povecajStranicu() {
        setStranica(stranica + 1);
    }

    function smanjiStranicu() {
        if (stranica == 1) {
            return;
        }
        setStranica(stranica - 1);
    }

    return (

        <Container>

            <Row>
                <Col key={1} sm={12} lg={4} md={4}>
                    <Form.Control
                        type='text'
                        name='trazilica'
                        placeholder='Dio imena i prezimena [Enter]'
                        maxLength={255}
                        defaultValue=''
                        onKeyUp={promjeniUvjet}
                    />
                </Col>
                <Col key={2} sm={12} lg={4} md={4}>
                    {djelatnici && djelatnici.length > 0 && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination size="lg">
                                <Pagination.Prev onClick={smanjiStranicu} />
                                <Pagination.Item disabled>{stranica}</Pagination.Item>
                                <Pagination.Next
                                    onClick={povecajStranicu}
                                />
                            </Pagination>
                        </div>
                    )}
                </Col>
                <Col key={3} sm={12} lg={4} md={4}>
                    <Link to={RoutesNames.DJELATNICI_NOVI} className="btn btn-success gumb">
                        <IoPersonAddSharp
                            size={35}
                        /> Dodaj djelatnika
                    </Link>
                </Col>
            </Row>

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

            <hr />
              {djelatnici && djelatnici.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                    <Pagination.Prev onClick={smanjiStranicu} />
                    <Pagination.Item disabled>{stranica}</Pagination.Item> 
                    <Pagination.Next
                        onClick={povecajStranicu}
                    />
                    </Pagination>
                </div>
                )}

            <Modal show={prikaziModal} onHide={zatvoriModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Uspješno</Modal.Title>
                </Modal.Header>
                <Modal.Body>Djelatnik je uspješno obrisan.</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={zatvoriModal}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );

}