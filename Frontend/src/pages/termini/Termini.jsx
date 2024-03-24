import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { BsBuildingAdd } from "react-icons/bs";
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

      function formatirajDatum(datum){
        let mdp = moment.utc(datum);
        if(mdp.hour()==0 && mdp.minutes()==0){
            return mdp.format('DD. MM. YYYY.');
        }
        return mdp.format('DD. MM. YYYY. HH:mm');        
      }


    return (

        <Container>
            <Link to={RoutesNames.TERMINI_NOVI} className="btn btn-success gumb">
                <BsBuildingAdd
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
                                <p>
                                {entitet.datum==null 
                                ? 'Nije definirano'
                                :   
                                formatirajDatum(entitet.datum)
                                }
                                </p>
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