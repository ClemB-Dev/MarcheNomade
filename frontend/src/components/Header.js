import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../css/header.css'
import UserImg from '../assets/icon-user.png'
import HomeImg from '../assets/home.png'


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='header' id='header'>
        <Link className='header-btn' to='/'><img className='header-icon' src={HomeImg}/></Link>
        {user 
          ? (<Link className='header-btn' to='/login' onClick={logoutUser}>Logout</Link>)
          : (<Link className='header-btn' to='/login'><img className='header-icon' src={UserImg}/></Link>)}
        {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Header
