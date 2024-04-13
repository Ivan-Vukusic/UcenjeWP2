import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ObjektService from "../../services/ObjektService";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function Objekti(){

    const [objekti,setObjekti] = useState();
    let navigate = useNavigate();
    const [prikaziModal, setPrikaziModal] = useState(false); 
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiObjekte(){
        showLoading();
        const odgovor = await ObjektService.get('Objekt');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setObjekti(odgovor.podaci);
        hideLoading();
    }

    async function obrisiObjekt(sifra) {
        showLoading();
        const odgovor = await ObjektService.obrisi('Objekt', sifra);
        hideLoading();             
        if (odgovor.ok){
            dohvatiObjekte();
            setPrikaziModal(true);
        } else {
            prikaziError(odgovor.podaci); 
        }
    }

    function zatvoriModal(){
        setPrikaziModal(false);
    }

    useEffect(()=>{
        dohvatiObjekte();
    },[]);         

    return (

        <Container>
            <Link to={RoutesNames.OBJEKTI_NOVI} className="btn btn-success gumb">
                <BsBuildingAdd
                size={25}
                /> Dodaj objekt
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Mjesto</th>
                        <th className="sredina">Adresa</th>
                        <th className="sredina">Vrsta</th>                        
                        <th className="sredina">Mogućnosti</th>
                    </tr>
                </thead>
                <tbody>
                    {objekti && objekti.map((entitet,index)=>(
                        <tr key={index}>
                            <td className="sredina">{entitet.mjesto}</td>
                            <td className="sredina">{entitet.adresa}</td>
                            <td className="sredina">{entitet.vrstaNaziv}</td>
                            
                            <td className="sredina">
                            <Button 
                                    variant="primary"
                                onClick={()=>{navigate(`/objekti/${entitet.sifra}`)}}>                
                                    <FaRegEdit   
                                    size={35}                
                                    />
                                </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiObjekt(entitet.sifra)}
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
            <Modal show={prikaziModal} onHide={() => setPrikaziModal(false)}> 
                <Modal.Header closeButton>
                    <Modal.Title>Uspješno</Modal.Title>
                </Modal.Header>
                <Modal.Body>Objekt je uspješno obrisan.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setPrikaziModal(false)}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );

}