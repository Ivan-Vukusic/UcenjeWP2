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
                <InputText atribut='Ime djelatnika' vrijednost=''  />
                <InputText atribut='Prezime djelatnika' vrijednost=''  />
                <InputText atribut='Broj mobitela' vrijednost=''  />
                <InputText atribut='OIB djelatnika' vrijednost=''  />
                <InputText atribut='Struka djelatnika' vrijednost=''  />                
                <Akcije odustani={RoutesNames.DJELATNICI_PREGLED} akcija='Dodaj djelatnika' />
           </Form>
        </Container>

    ) 

}