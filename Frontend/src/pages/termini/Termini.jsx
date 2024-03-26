import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import TerminService from "../../services/TerminService";
import { RoutesNames } from "../../constants";


export default function Termini(){
    const [termini,setTermini] = useState();
    let navigate = useNavigate(); 

    async function dohvatiTermine(){
        await TerminService.get()
        .then((res)=>{
            setTermini(res.data);
        })       
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiTermine();
    },[]);

    async function obrisiTermin(sifra) {
        const odgovor = await TerminService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiTermine();
        } else {
          alert(odgovor.poruka);
        }
      }   

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
                            <td className="sredina">{entitet.napomena}</td>
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
        </Container>

    );

}