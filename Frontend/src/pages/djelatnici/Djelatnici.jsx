import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import DjelatnikService from "../../services/DjelatnikService";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Djelatnici(){

    const [djelatnici,setDjelatnici] = useState();
    const navigate = useNavigate();

    async function dohvatiDjelatnike(){
        await DjelatnikService.getDjelatnici()
        .then((res)=>{
            setDjelatnici(res.data);
        })
        .catch((e)=>{
            alert(e); 
        });
    }

    useEffect(()=>{
        dohvatiDjelatnike();
    },[]); 
    
    async function obrisiDjelatnika(sifra){
        const odgovor = await DjelatnikService.obrisiDjelatnika(sifra);
        if(odgovor.ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiDjelatnike();
        }
        
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
        </Container>

    );

}