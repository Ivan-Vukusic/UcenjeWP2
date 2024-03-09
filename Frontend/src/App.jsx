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
      </>
    </Routes>
    </>
  )
}

export default App
