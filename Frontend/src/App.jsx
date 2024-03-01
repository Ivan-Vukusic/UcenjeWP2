import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import Navbar from "./components/NavBar"
import Djelatnici from "./pages/djelatnici/Djelatnici"
import './App.css';
import DjelatniciDodaj from "./pages/djelatnici/DjelatniciDodaj"


function App() {
  

  return (
    <>
    <Navbar />
    <Routes>
      <>
      <Route path={RoutesNames.HOME} element={<Pocetna />} />
      <Route path={RoutesNames.DJELATNICI_PREGLED} element={<Djelatnici />} />
      <Route path={RoutesNames.DJELATNICI_NOVI} element={<DjelatniciDodaj />} />
      </>
    </Routes>
    </>
  )
}

export default App
