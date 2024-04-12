import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import Navbar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Djelatnici from "./pages/djelatnici/Djelatnici"
import DjelatniciDodaj from "./pages/djelatnici/DjelatniciDodaj"
import DjelatniciPromjeni from "./pages/djelatnici/DjelatniciPromjeni"

import Otrovi from "./pages/otrovi/Otrovi"
import OtroviDodaj from "./pages/otrovi/OtroviDodaj"
import OtroviPromjeni from "./pages/otrovi/OtroviPromjeni"

import Vrste from "./pages/vrste/Vrste"
import VrsteDodaj from "./pages/vrste/VrsteDodaj"
import VrstePromjeni from "./pages/vrste/VrstePromjeni"

import Objekti from "./pages/objekti/Objekti"
import ObjektiDodaj from "./pages/objekti/ObjektiDodaj"
import ObjektiPromjeni from "./pages/objekti/ObjektiPromjeni"

import Termini from "./pages/termini/Termini"
import TerminiDodaj from "./pages/termini/TerminiDodaj"
import TerminiPromjeni from "./pages/termini/TerminiPromjeni"

import ErrorModal from './components/ErrorModal'
import useError from "./hooks/useError"
import LoadingSpinner from "./components/LoadingSpinner"
//import Login from "./pages/Login"
//import useAuth from "./hooks/useAuth"


function App() {
  const { errors, prikaziErrorModal, sakrijError } = useError();
  //const { isLoggedIn } = useAuth();
  return (
    <>
      <LoadingSpinner />
      <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
      <Navbar />
      <Routes>
       
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          {/*isLoggedIn ? (*/}
            <>
              <Route path={RoutesNames.DJELATNICI_PREGLED} element={<Djelatnici />} />
              <Route path={RoutesNames.DJELATNICI_NOVI} element={<DjelatniciDodaj />} />
              <Route path={RoutesNames.DJELATNICI_PROMJENI} element={<DjelatniciPromjeni />} />

              <Route path={RoutesNames.OTROVI_PREGLED} element={<Otrovi />} />
              <Route path={RoutesNames.OTROVI_NOVI} element={<OtroviDodaj />} />
              <Route path={RoutesNames.OTROVI_PROMJENI} element={<OtroviPromjeni />} />

              <Route path={RoutesNames.VRSTE_PREGLED} element={<Vrste />} />
              <Route path={RoutesNames.VRSTE_NOVI} element={<VrsteDodaj />} />
              <Route path={RoutesNames.VRSTE_PROMJENI} element={<VrstePromjeni />} />

              <Route path={RoutesNames.OBJEKTI_PREGLED} element={<Objekti />} />
              <Route path={RoutesNames.OBJEKTI_NOVI} element={<ObjektiDodaj />} />
              <Route path={RoutesNames.OBJEKTI_PROMJENI} element={<ObjektiPromjeni />} />

              <Route path={RoutesNames.TERMINI_PREGLED} element={<Termini />} />
              <Route path={RoutesNames.TERMINI_NOVI} element={<TerminiDodaj />} />
              <Route path={RoutesNames.TERMINI_PROMJENI} element={<TerminiPromjeni />} />
            </>
          {/*) : (*/}
           {/* <> */}
             {/* <Route path={RoutesNames.LOGIN} element={<Login />} /> */}
           {/* </> */}
       {/* )}*/}
       </Routes>
     </>
  )
}

export default App
