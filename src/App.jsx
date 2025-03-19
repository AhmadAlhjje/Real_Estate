import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar"
import HomePage from "./pages/HomePage/HomePage"
import Footer from './components/Footer/Footer';
import RealEstate from './pages/RealEstate/RealEstate';

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/realEstate" element={<RealEstate/>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
