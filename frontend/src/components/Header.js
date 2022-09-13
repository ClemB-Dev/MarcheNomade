import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../css/header.css'
import LogInImg from '../assets/login.png'
import LogOutImg from '../assets/logout.png'
import HomeImg from '../assets/earth.png'


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='header' id='header'>
        <Link className='header-btn' to='/'><img className='header-icon' src={HomeImg}/></Link>
        {user 
          ? (<Link className='header-btn' to='/login' onClick={logoutUser}><img className='header-icon' src={LogOutImg}/></Link>)
          : (<Link className='header-btn' to='/login'><img className='header-icon' src={LogInImg}/></Link>)}
        {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Header
