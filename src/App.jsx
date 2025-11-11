import { Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RentSpace from './pages/RentSpace';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (  <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Home/>}/>

        <Route path='/dashboard/rent-space' element={<RentSpace/>}/>
      </Routes>
    </>
  );
}

export default App
