import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import DjelatnikService from '../../services/DjelatnikService';
import useError from "../../hooks/useError";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from "../../hooks/useLoading";

export default function DjelatniciDodaj(){
    
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajDjelatnika(djelatnik){
        showLoading();
        const odgovor = await DjelatnikService.dodaj('Djelatnik', djelatnik);
        if(odgovor.ok){
          navigate(RoutesNames.DJELATNICI_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
        hideLoading();
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);        
        
        dodajDjelatnika({            
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojMobitela: podaci.get('brojMobitela'),
            oib: podaci.get('oib'),
            struka: podaci.get('struka'),
            slika: '' 
          });
    }

    return(

        <Container>
           <Form onSubmit={handleSubmit}>
                <InputText atribut='ime' vrijednost=''  />
                <InputText atribut='prezime' vrijednost=''  />
                <InputText atribut='brojMobitela' vrijednost=''  />
                <InputText atribut='oib' vrijednost=''  />
                <InputText atribut='struka' vrijednost=''  />                
                <Akcije odustani={RoutesNames.DJELATNICI_PREGLED} akcija='Dodaj djelatnika' />
           </Form>
        </Container>

    ) 

}