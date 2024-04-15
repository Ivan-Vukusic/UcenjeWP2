import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import OtrovService from '../../services/OtrovService';
import useError from "../../hooks/useError";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from "../../hooks/useLoading";

export default function OtroviDodaj(){

    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajOtrov(otrov){
        showLoading();
        const odgovor = await OtrovService.dodaj('Otrov', otrov);
        if(odgovor.ok){
          navigate(RoutesNames.OTROVI_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
        hideLoading();
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);        
        
        dodajOtrov({            
            naziv: podaci.get('naziv'),
            aktivnaTvar: podaci.get('aktivnaTvar'),
            kolicina: parseFloat (podaci.get('kolicina')),
            casBroj: podaci.get('casBroj')
          });        
    }

    return(

        <Container>
           <Form onSubmit={handleSubmit}>
                <InputText atribut='Naziv otrova' vrijednost=''  />
                <InputText atribut='Aktivna tvar u otrovu' vrijednost=''  />
                <InputText atribut='Količina otrova' vrijednost=''  />
                <InputText atribut='CAS broj' vrijednost=''  />                                
                <Akcije odustani={RoutesNames.OTROVI_PREGLED} akcija='Dodaj otrov' />
           </Form>
        </Container>

    ) 

}