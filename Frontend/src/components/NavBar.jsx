import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames, App } from '../constants';

import './NavBar.css';
//import useAuth from '../hooks/useAuth';

function NavBar() {

  const navigate = useNavigate();
  //const { logout, isLoggedIn } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          className='linkPocetna'
          onClick={() => navigate(RoutesNames.HOME)}
        >
          Deratizacija APP
        </Navbar.Brand>

       {/* {isLoggedIn ? ( */} 
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavDropdown title="Izbornik" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => navigate(RoutesNames.TERMINI_PREGLED)}
                >
                  Termini
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={() => navigate(RoutesNames.DJELATNICI_PREGLED)}
                >
                  Djelatnici
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => navigate(RoutesNames.OTROVI_PREGLED)}
                >
                  Otrovi
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => navigate(RoutesNames.OBJEKTI_PREGLED)}
                >
                  Objekti
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={() => navigate(RoutesNames.VRSTE_PREGLED)}
                >
                  Vrste
                </NavDropdown.Item>

              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {/* <Nav.Link onClick={logout}>Odjava</Nav.Link> */} 
              <Nav.Link target='_blank' href={App.URL + '/swagger/index.html'}>API Dokumentacija</Nav.Link>
            </Nav>
          </Navbar.Collapse>
           </> 
          {/* ) : ( */}
          <>
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
                Prijava
              </Nav.Link>
            </Navbar.Collapse>
          </>
         {/*  )} */}
      </Container>
    </Navbar>
  );
}

export default NavBar;