import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../css/header.css'
import HomeImg from '../assets/earth.png'
import ReactTooltip from 'react-tooltip'


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  
  return (
    <div className='header' id='header'>
      <div className="container">
        <Link className='logo' to='/'><img className='header-icon' src={HomeImg}/></Link>
        <ul className='slider-menu'>
          {user && user.groups.includes('Owner') 
            ? (<li key='manage-stand' className='menu-item'>
              <Link data-tip data-for='manage-stand-tooltip' className='img-stands' to='/manage-stands'><img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-market-vegan-and-vegetarian-flaticons-flat-flat-icons.png"/></Link>
              <ReactTooltip id='manage-stand-tooltip'>
                <p>Gérer mes stands</p>
              </ReactTooltip>
              </li>)
            : (<li key='manage-stand' className='menu-item'></li>)}
          {user 
            ? (<li key='welcome-div' className='menu-item'>Bonjour {user.username}!</li>)
            : (<li key='welcome-div' className='menu-item'>Bienvenue!</li>)}
          {user 
            ? (<li key='logout' className='menu-item header-link'><Link to='/login' onClick={logoutUser}><img src="https://img.icons8.com/ios/50/000000/exit.png"/></Link></li>)
            : (<li key='login' className='menu-item header-link'><Link to='/login'><img src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-Person-contour-others-inmotus-design.png"/></Link></li>)}
        </ul>
      </div>
    </div>
  )
}

export default Header
