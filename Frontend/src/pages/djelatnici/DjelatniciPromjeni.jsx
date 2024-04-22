import { useEffect, useRef, useState } from 'react';
import {Button, Col, Container, Form, Image, Row} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import DjelatnikService from '../../services/DjelatnikService';
import { App, RoutesNames } from '../../constants';
import useError from "../../hooks/useError";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useLoading from "../../hooks/useLoading";
import slika2 from "../../assets/images/slika2.png"

export default function DjelatniciPromjeni(){

    const [djelatnik,setDjelatnik] = useState({});

    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);
    
    const routeParams = useParams();
    const navigate = useNavigate();
    const { prikaziError } = useError();    
    const { showLoading, hideLoading } = useLoading();
        
    async function dohvatiDjelatnika(){ 
        showLoading();       
        const odgovor = await DjelatnikService.getBySifra('Djelatnik',routeParams.sifra)
          if(!odgovor.ok){
              hideLoading();
              prikaziError(odgovor.podaci);              
              return;
          }
          setDjelatnik(odgovor.podaci);          

          if(odgovor.podaci.slika!=null){
            setTrenutnaSlika(App.URL + odgovor.podaci.slika + `?${Date.now()}`);
          }else{
            setTrenutnaSlika(slika2);
          }
          hideLoading();         
      }

    useEffect(()=>{
        dohvatiDjelatnika();
    },[]);

    async function promjeniDjelatnika(djelatnik){
        showLoading();        
          const odgovor = await DjelatnikService.promjeni('Djelatnik',routeParams.sifra, djelatnik);
          if(odgovor.ok){
            hideLoading(); 
            navigate(RoutesNames.DJELATNICI_PREGLED);                       
            return;
          }
          prikaziError(odgovor.podaci);
          hideLoading();          
      }

    function handleSubmit(e){
        e.preventDefault();
        
        const podaci = new FormData(e.target);        
        
        promjeniDjelatnika({            
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojMobitela: podaci.get('brojMobitela'),
            oib: podaci.get('oib'),
            struka: podaci.get('struka'),
            slika: ''
          });          
    }

    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }
    
      function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setSlikaZaCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }

      async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;
    
        const odgovor = await DjelatnikService.postaviSliku(routeParams.sifra, {Base64: base64.replace('data:image/png;base64,', '')});
        if(!odgovor.ok){
          hideLoading();
          prikaziError(odgovor.podaci);
        }        
        setTrenutnaSlika(slikaZaServer);
        hideLoading();
      }

    return(

        <Container>
       <Row>
        <Col key='1' sm={12} lg={6} md={6}>
          <Form onSubmit={handleSubmit}>
          <InputText atribut='ime' vrijednost={djelatnik.ime} />
          <InputText atribut='prezime' vrijednost={djelatnik.prezime} />
          <InputText atribut='brojMobitela' vrijednost={djelatnik.brojMobitela} />
          <InputText atribut='oib' vrijednost={djelatnik.oib} />
          <InputText atribut='struka' vrijednost={djelatnik.struka} />                
          <Akcije odustani={RoutesNames.DJELATNICI_PREGLED} akcija='Promjeni djelatnika' />
          </Form>
          <Row>
              <Col key='1' sm={12} lg={6} md={12}>
                <p className='form-label'>Trenutna slika</p>
                <Image
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <p className='form-label'>Nova slika</p>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>
        </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <input className='mb-3' type='file' onChange={onChangeImage} />
              <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
        </Col>
      </Row>
      
    </Container>        
    ); 

}