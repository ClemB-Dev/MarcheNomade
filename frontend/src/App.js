import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Header/>
        <Routes>
          < Route path='/' exact element={<PrivateRoute><HomePage/></PrivateRoute>}/>
          < Route element={<LoginPage/>} path='/login'/>
        </Routes>
      </AuthProvider>
    </div>
  );
}


export default App;
