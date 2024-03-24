import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ObjektService from "../../services/ObjektService";
import { RoutesNames } from "../../constants";


export default function Objekti(){
    const [objekti,setObjekti] = useState();
    let navigate = useNavigate(); 

    async function dohvatiObjekte(){
        await ObjektService.get()
        .then((res)=>{
            setObjekti(res.data);
        })       
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiObjekte();
    },[]);

    async function obrisiObjekt(sifra) {
        const odgovor = await ObjektService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiObjekte();
        } else {
          alert(odgovor.poruka);
        }
      }        

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
        </Container>

    );

}