import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import TerminService from "../../services/TerminService";
import DjelatnikService from "../../services/DjelatnikService";
import ObjektService from "../../services/ObjektService";
import OtrovService from "../../services/OtrovService";
import { RoutesNames } from "../../constants";
import useError from '../../hooks/useError';
import Akcije from '../../components/Akcije';
import useLoading from '../../hooks/useLoading';


export default function TerminiPromjeni() {

    const routeParams = useParams();
    const navigate = useNavigate();
    const [termin, setTermin] = useState({});

    const [djelatnici, setDjelatnici] = useState([]);
    const [djelatnikSifra, setDjelatnikSifra] = useState(0);

    const [objekti, setObjekti] = useState([]);
    const [objektSifra, setObjektSifra] = useState(0);

    const [otrovi, setOtrovi] = useState([]);
    const [otrovSifra, setOtrovSifra] = useState(0);

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiTermin() {
        showLoading();
        const odgovor = await TerminService.getBySifra('Termin', routeParams.sifra);
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setTermin(odgovor.podaci);
        setDjelatnikSifra(odgovor.podaci.djelatnikSifra);
        setObjektSifra(odgovor.podaci.objektSifra);
        setOtrovSifra(odgovor.podaci.otrovSifra);
        hideLoading();
    }

    async function dohvatiDjelatnike() {
        showLoading();
        const odgovor = await DjelatnikService.get('Djelatnik');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setDjelatnici(odgovor.podaci);
        setDjelatnikSifra(odgovor.podaci[0].sifra);
        hideLoading();
    }

    async function dohvatiObjekte() {
        showLoading();
        const odgovor = await ObjektService.get('Objekt');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setObjekti(odgovor.podaci);
        setObjektSifra(odgovor.podaci[0].sifra);
        hideLoading();
    }

    async function dohvatiOtrove() {
        showLoading();
        const odgovor = await OtrovService.get('Otrov');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setOtrovi(odgovor.podaci);
        setOtrovSifra(odgovor.podaci[0].sifra);
        hideLoading();
    }

    async function ucitaj() {
        showLoading();
        await dohvatiTermin();
        await dohvatiDjelatnike();
        await dohvatiObjekte();
        await dohvatiOtrove();
        hideLoading();
    }

    useEffect(() => {
        ucitaj();
    }, []);

    async function promjeni(termin) {
        showLoading();
        const odgovor = await TerminService.promjeni('Termin', routeParams.sifra, termin);
        if (odgovor.ok) {
            hideLoading();
            navigate(RoutesNames.TERMINI_PREGLED);
            return;
        }
        prikaziError(odgovor.podaci);
        hideLoading();
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
                    />
                </Form.Group>

                <Form.Group controlId='djelatnik'>
                    <Form.Label>Djelatnik</Form.Label>
                    <Form.Select
                        onChange={(e) => { setDjelatnikSifra(e.target.value) }}
                    >
                        {djelatnici && djelatnici.map((d, index) => (
                            <option key={index} value={d.sifra}>
                                {d.ime} {d.prezime}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId='objekt'>
                    <Form.Label>Objekt</Form.Label>
                    <Form.Select
                        onChange={(e) => { setObjektSifra(e.target.value) }}
                    >
                        {objekti && objekti.map((o, index) => (
                            <option key={index} value={o.sifra}>
                                {o.mjesto}, {o.adresa}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId='otrov'>
                    <Form.Label>Otrov</Form.Label>
                    <Form.Select
                        onChange={(e) => { setOtrovSifra(e.target.value) }}
                    >
                        {otrovi && otrovi.map((o, index) => (
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
                        defaultValue={termin.napomena}
                        name='napomena'
                    />
                </Form.Group>

                <Akcije odustani={RoutesNames.TERMINI_PREGLED} akcija='Promjeni termin' />

            </Form>

        </Container>


    );

}