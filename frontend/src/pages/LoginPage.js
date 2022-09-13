import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/authentification.css'


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div className='container'>
      <div className='screen'>
        <div className='loginContainer'>
          <form className='login' onSubmit={loginUser}>
          <div className='form-title'>Connexion</div>
          <div className='register-div'><p className='register-sentence'>Pas encore inscrit? <Link className='register-link' to='/register'>Inscription</Link></p></div>
            <div className='login_field'>
              <label>Nom d'utilisateur</label><br></br>
              <input
                  className='login_input'
                  type='text'
                  name='username'
                  placeholder="Entrez un nom d'utilisateur"/>
            </div>
            <div className='login_field'>
              {/* <i className="login_icon fas fa-lock"></i> */}
              <label>Mot de passe</label><br></br>
              <input
                  className='login_input'
                  type='password'
                  name='password'
                  placeholder='Entrer un mot de passe'/>
            </div>
            <div className='login_submit'>
              <input
                  className='button_text'
                  type='submit'
                  value="Se connecter"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
