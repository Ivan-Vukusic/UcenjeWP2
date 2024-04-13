import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import VrstaService from "../../services/VrstaService";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function Vrste(){

    const [vrste,setVrste] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiVrste(){
        showLoading();
        const odgovor = await VrstaService.get('Vrsta');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            hideLoading();
            return;
        }
        setVrste(odgovor.podaci);
        hideLoading();        
    }

    async function obrisiVrstu(sifra){
        showLoading();
        const odgovor = await VrstaService.obrisi('Vrsta', sifra);
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiVrste();
        }
        hideLoading();
    }

    useEffect(()=>{
        dohvatiVrste();
    },[]);     

    return (

        <Container>
            <Link to={RoutesNames.VRSTE_NOVI} className="btn btn-success gumb">                
            <BsFillHouseAddFill    
                size={35}                
            /> Dodaj vrstu objekta
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Naziv</th>                                           
                        <th className="sredina">Mogućnosti</th>
                    </tr>
                </thead>
                <tbody>
                    {vrste && vrste.map((vrsta, index)=>(
                        <tr key={index}>
                            <td className="sredina">{vrsta.naziv}</td>                                                      
                            <td className="sredina">
                                <Button 
                                    variant="primary"
                                onClick={()=>{navigate(`/vrste/${vrsta.sifra}`)}}>                
                                    <FaRegEdit   
                                    size={35}                
                                    />
                                </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiVrstu(vrsta.sifra)}
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