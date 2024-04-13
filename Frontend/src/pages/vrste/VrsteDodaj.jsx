import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import VrstaService from '../../services/VrstaService';
import useError from "../../hooks/useError";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from "../../hooks/useLoading";

export default function VrsteDodaj(){

    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajVrstu(vrsta){
        showLoading();
        const odgovor = await VrstaService.dodaj('Vrsta', vrsta);
        if(odgovor.ok){
          navigate(RoutesNames.VRSTE_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
        hideLoading();
    }

    function handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);        
        
        dodajVrstu({            
            naziv: podaci.get('naziv')                        
        });
    }

    return(

        <Container>
           <Form onSubmit={handleSubmit}>
                <InputText atribut='naziv' vrijednost='' placeholder='Naziv vrste objekta' />                
                <Akcije odustani={RoutesNames.VRSTE_PREGLED} akcija='Dodaj vrstu' />
           </Form>
        </Container>

    ) 

}