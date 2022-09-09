import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import '../css/authentification.css'

const RegisterPage = () => {
  let {registerUser} = useContext(AuthContext)

  return (
    <div className='container'>
    <div className='screen'>
      <div className='loginContainer'>
        <form className='register' onSubmit={registerUser}>
        <div className='form-title'>Inscription</div>
        <div className='register-div'><p className='register-sentence'>Déjà inscrit? <Link className='register-link' to='/login'>Connexion</Link></p></div>
          <div className='login_field'>
            <label>Prénom</label><br></br>
            <input
                className='login_input'
                type='text'
                name='first_name'
                placeholder='Entrez le prénom'/>
          </div>
          <div className='login_field'>
            <label>Nom</label><br></br>
            <input
                className='login_input'
                type='text'
                name='lastname'
                placeholder='Entrez le nom'/>
          </div>
          <div className='login_field'>
            <label>Nom d'utilisateur</label><br></br>
            <input
                className='login_input'
                type='text'
                name='username'
                placeholder='Entrez un nom utilisateur'/>
          </div>
          <div className='login_field'>
            <label>Email</label><br></br>
            <input
                className='login_input'
                type='text'
                name='username'
                placeholder='Entrez une adresse mail'/>
          </div>
          <div className='login_field'>
            <label>Mot de passe</label><br></br>
            <input
                className='login_input'
                type='text'
                name='password'
                placeholder='Entrez un mot de passe'/>
            <input
                className='login_input'
                type='text'
                name='password2'
                placeholder='Confirmer le mot de passe'/>
          </div>
          <div className='login_submit'>
            <input
                className='button_text'
                type='submit'
                value="S'inscrire"/>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default RegisterPage
