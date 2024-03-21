import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
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

            let objekti = res.data;
            objekti.forEach(e => {
                if(e.mjesto==null){
                    e.mjesto=0;
                }

            });
            setObjekti(objekti);
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
                <IoIosAdd
                size={25}
                /> Dodaj objekt
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Mjesto</th>
                        <th>Adresa</th>
                        <th>Vrsta</th>                        
                        <th>Mogućnosti </th>
                    </tr>
                </thead>
                <tbody>
                    {objekti && objekti.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.mjesto}</td>
                            <td>{entitet.adresa}</td>
                            <td>{entitet.vrstaNaziv}</td>
                            <td>
                                
                                
                            </td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/objekti/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiObjekt(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}