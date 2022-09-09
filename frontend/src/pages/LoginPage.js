import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/signIn.css'


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div className='container'>
      <div className='screen'>
        <div className='loginContainer'>
          <form className='login' onSubmit={loginUser}>
            <div className='login_field'>
              <label>Username</label><br></br>
              <input
                  className='login_input'
                  type='text'
                  name='username'
                  placeholder='Enter username'/>
            </div>
            <div className='login_field'>
              {/* <i className="login_icon fas fa-lock"></i> */}
              <label>Password</label><br></br>
              <input
                  className='login_input'
                  type='password'
                  name='password'
                  placeholder='Enter password'/>
            </div>
            <div className='login_submit'>
              <input
                  className='button_text'
                  type='submit'/>
            </div>
          </form>
          <Link className='register-btn' to='/register'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
