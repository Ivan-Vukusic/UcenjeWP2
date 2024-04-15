import { useEffect, useState } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TerminService from "../../services/TerminService";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function Termini(){

    const [termini,setTermini] = useState();
    let navigate = useNavigate(); 
    const [prikaziModal, setPrikaziModal] = useState(false); 
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiTermine(){
        showLoading();
        const odgovor = await TerminService.get('Termin');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setTermini(odgovor.podaci);
        hideLoading();
    }

    async function obrisiTermin(sifra) {
        showLoading();
        const odgovor = await TerminService.obrisi('Termin', sifra);
        hideLoading();             
        if (odgovor.ok){
            dohvatiTermine();
            setPrikaziModal(true);
        } else {
            prikaziError(odgovor.podaci); 
        }
    }

    function zatvoriModal(){
        setPrikaziModal(false);
    }

    useEffect(()=>{
        dohvatiTermine();
    },[]);      

    return (

        <Container>
            <Link to={RoutesNames.TERMINI_NOVI} className="btn btn-success gumb">
                <MdOutlineNoteAdd
                size={25}
                /> Dodaj termin
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Datum</th>
                        <th className="sredina">Djelatnik</th>
                        <th className="sredina">Objekt</th>
                        <th className="sredina">Otrov</th>
                        <th className="sredina">Napomena</th>                        
                        <th className="sredina">Mogućnosti</th>
                    </tr>
                </thead>
                <tbody>
                    {termini && termini.map((entitet,index)=>(
                        <tr key={index}>
                            <td className="sredina">
                                {
                                   entitet.datum == null ? 'Nije uneseno' : moment.utc(entitet.datum).format('DD.MM.YYYY.')
                                }
                                </td>

                            <td className="sredina">{entitet.djelatnikImePrezime}</td>
                            <td className="sredina">{entitet.objektMjestoAdresa}</td>
                            <td className="sredina">{entitet.otrovNaziv}</td>
                            <td className="sredina">                            
                            {entitet.napomena == null || entitet.napomena.trim() == '' ? 'Nema napomene' : entitet.napomena}
                                </td>
                            
                            <td className="sredina">
                            <Button 
                                    variant="primary"
                                onClick={()=>{navigate(`/termini/${entitet.sifra}`)}}>                
                                    <FaRegEdit   
                                    size={35}                
                                    />
                                </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiTermin(entitet.sifra)}
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
            <Modal show={prikaziModal} onHide={zatvoriModal}> 
                <Modal.Header closeButton>
                    <Modal.Title>Uspješno</Modal.Title>
                </Modal.Header>
                <Modal.Body>Termin je uspješno obrisan.</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={zatvoriModal}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );

}