import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OtrovService from "../../services/OtrovService";
import { GiPoisonBottle } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Otrovi(){

    const [otrovi,setOtrovi] = useState();
    const navigate = useNavigate();

    async function dohvatiOtrove(){
        await OtrovService.getOtrovi()
        .then((res)=>{
            setOtrovi(res.data);
        })
        .catch((e)=>{
            alert(e); 
        });
    }

    useEffect(()=>{
        dohvatiOtrove();
    },[]); 
    
    async function obrisiOtrov(sifra){
        const odgovor = await OtrovService.obrisiOtrov(sifra);
        if(odgovor.ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiOtrove();
        }
        
    }

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
                            <td className="sredina">{otrov.kolicina}</td>                            
                            <td className="sredina">{otrov.casBroj}</td>                            
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