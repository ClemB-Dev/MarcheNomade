import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import ManageStands from './pages/ManageStands';


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Header/>
        <Routes>
          < Route element={<HomePage/>} path='/' exact />
          < Route element={<LoginPage/>} path='/login'/>
          < Route element={<RegisterPage/>} path='/register'/>
          < Route element={<ManageStands/>} path='/manage-stands'/>
        </Routes>
      </AuthProvider>
    </div>
  );
}


export default App;
