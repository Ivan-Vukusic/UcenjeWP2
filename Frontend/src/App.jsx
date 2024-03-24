import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import Navbar from "./components/NavBar"
import Djelatnici from "./pages/djelatnici/Djelatnici"
import './App.css';
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

function App() {  

  return (
    <>
    <Navbar />
    <Routes>
      <>
      <Route path={RoutesNames.HOME} element={<Pocetna />} />
      
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
      </>
    </Routes>
    </>
  )
}

export default App
