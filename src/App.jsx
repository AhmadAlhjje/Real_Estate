import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import Footer from './components/Footer/Footer';
import RealEstate from './pages/RealEstate/RealEstate';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PropertyDetails from './pages/PropertyDetails/PropertyDetails';
import AddProperty from './pages/AddProperty/AddProperty';
// import A from './pages/A/A';
// import MapComponent from './components/MapComponent/MapComponent';

function AppContent() {
  const location = useLocation(); // الحصول على المسار الحالي
  const hideNavBar = location.pathname === "/register" ||location.pathname === "/login"; // التحقق إذا كان في صفحة التسجيل

  return (
    <>
      {!hideNavBar && <NavBar />} {/* إخفاء الـ NavBar عند الدخول لصفحة التسجيل */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/realEstate" element={<RealEstate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/AddProperty" element={<AddProperty />} />
        {/* <Route path="/a" element={<A />} /> */}
        {/* <Route path="/MapComponent" element={<MapComponent />} /> */}
      </Routes>
      {!hideNavBar && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
