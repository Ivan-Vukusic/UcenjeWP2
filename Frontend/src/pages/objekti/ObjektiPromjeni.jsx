import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ObjektService from '../../services/ObjektService';
import VrstaService from '../../services/VrstaService';
import { RoutesNames } from '../../constants';
import useError from '../../hooks/useError';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import useLoading from '../../hooks/useLoading';

export default function ObjektiPromjeni() {

    const [objekt, setObjekt] = useState({});
    const routeParams = useParams();
    const navigate = useNavigate();

    const [vrste, setVrste] = useState([]);
    const [vrstaSifra, setVrstaSifra] = useState(0);

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiVrste() {
        showLoading();
        const odgovor = await VrstaService.get('Vrsta');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setVrste(odgovor.podaci);
        setVrstaSifra(odgovor.podaci[0].sifra);
        hideLoading();
    }

    async function dohvatiObjekt() {
        showLoading();
        const odgovor = await ObjektService.getBySifra('Objekt', routeParams.sifra);
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setObjekt(odgovor.podaci);
        setVrstaSifra(odgovor.podaci.vrstaSifra);
        hideLoading();
    }

    async function ucitaj() {
        showLoading();
        await dohvatiObjekt();
        await dohvatiVrste();
        hideLoading();
    }

    useEffect(() => {
        ucitaj();
    }, []);

    async function promjeni(objekt) {
        showLoading();
        const odgovor = await ObjektService.promjeni('Objekt', routeParams.sifra, objekt);
        if (odgovor.ok) {
            hideLoading();
            navigate(RoutesNames.OBJEKTI_PREGLED);
            return;
        }
        prikaziError(odgovor.podaci);
        hideLoading();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjeni({
            mjesto: podaci.get('mjesto'),
            adresa: podaci.get('adresa'),
            vrstaSifra: parseInt(vrstaSifra)
        });
    }

    return (

        <Container>

            <Form onSubmit={handleSubmit}>

                <InputText atribut='Mjesto' vrijednost={objekt.mjesto} />
                <InputText atribut='Adresa' vrijednost={objekt.adresa} />

                <Form.Group controlId='vrsta'>
                    <Form.Label>Vrsta objekta</Form.Label>
                    <Form.Select
                        onChange={(e) => { setVrstaSifra(e.target.value) }}
                    >
                        {vrste && vrste.map((v, index) => (
                            <option key={index} value={v.sifra}>
                                {v.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Akcije odustani={RoutesNames.OBJEKTI_PREGLED} akcija='Promjeni objekt' />

            </Form>

        </Container>

    )

}