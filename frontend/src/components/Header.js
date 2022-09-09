import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='header'>
        <Link className='home-btn' to='/'>Home</Link>
        {user 
          ? (<p className='logout-btn' onClick={logoutUser}>Logout</p>)
          : (<Link className='login-btn' to='/login'>Login</Link>)}
        {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Header
