import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OtrovService from "../../services/OtrovService";
import { GiPoisonBottle } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";


export default function Otrovi(){

    const [otrovi,setOtrovi] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiOtrove(){
        showLoading();
        const odgovor = await OtrovService.get('Otrov');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setOtrovi(odgovor.podaci);
        hideLoading();
    }    
    
    async function obrisiOtrov(sifra){
        showLoading();
        const odgovor = await OtrovService.obrisi('Otrov', sifra);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiOtrove();
        }
        hideLoading();        
    }

    useEffect(()=>{
        dohvatiOtrove();
    },[]); 

    return (

        <Container>
            <Link to={RoutesNames.OTROVI_NOVI} className="btn btn-success gumb">                
            <GiPoisonBottle    
                size={35}                
            /> Dodaj otrov
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Naziv</th>
                        <th className="sredina">Aktivna tvar</th>
                        <th className="sredina">Količina</th>
                        <th className="sredina">CAS broj</th>                        
                        <th className="sredina">Mogućnosti</th>
                    </tr>
                </thead>
                <tbody>
                    {otrovi && otrovi.map((otrov, index)=>(
                        <tr key={index}>
                            <td className="sredina">{otrov.naziv}</td>
                            <td className="sredina">{otrov.aktivnaTvar}</td>
                            <td className="sredina">{otrov.kolicina  == null ? 'Nije definirano' : otrov.kolicina}</td>                            
                            <td className="sredina">{otrov.casBroj == null || otrov.casBroj.trim() == '' ? 'Nije definirano' : otrov.casBroj}</td>                            
                            <td className="sredina">
                                <Button 
                                    variant="primary"
                                onClick={()=>{navigate(`/otrovi/${otrov.sifra}`)}}>                
                                    <FaRegEdit   
                                    size={35}                
                                    />
                                </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiOtrov(otrov.sifra)}
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
        </Container>

    );

}