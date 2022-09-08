import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Permet de renvoyer l'utilisateur vers la page de log in s'il n'est pas connecté
// (à voir si c'est utile dans notre cas)
// méthode qui peut être utilisée pour bloquer l'accès à certaines fonctions
// selon les autorisations de l'utilisateur
const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    return user ? children : <Navigate to='/login'/>
}

export default PrivateRoute