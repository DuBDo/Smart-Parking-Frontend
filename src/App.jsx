import { Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RentSpace from './pages/RentSpace';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import AuthSuccess from './pages/AuthSuccess';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (  <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/auth-success' element={<AuthSuccess/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>

        <Route path='/dashboard/rent-space' element={<RentSpace/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App
