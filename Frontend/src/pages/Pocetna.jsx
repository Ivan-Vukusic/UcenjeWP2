import Container from 'react-bootstrap/Container';
import slika1 from '../assets/images/slika1.jpg';


export default function Pocetna(){

    return(
        <>
        <Container className='sredina'>

            <h2>Evidencija provedene deratizacije</h2>

            <img src={slika1} alt="Glodavac" />             
            
        </Container>
        </>

    );


}