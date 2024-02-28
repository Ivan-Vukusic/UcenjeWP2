import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import Navbar from "./components/NavBar"


function App() {
  

  return (
    <>
    <Navbar />
    <Routes>
      <>
      <Route path={RoutesNames.HOME} element={<Pocetna />} />
      </>
    </Routes>
    </>
  )
}

export default App
