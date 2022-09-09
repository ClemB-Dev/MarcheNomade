import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  let {registerUser} = useContext(AuthContext)

  return (
    <div>
      <form className='register-form' onSubmit={registerUser}>
        <label htmlFor='first_name'>Firstname</label>
        <input
            type='text'
            name='first_name'
            placeholder='Enter firstname'/>
        <label htmlFor='last_name'>Lastname</label>
        <input
            type='text'
            name='last_name'
            placeholder='Enter lastname'/>
        <label htmlFor='Email'>Email</label>
        <input
            type='text'
            name='email'
            placeholder='Enter email'/>                        
        <label htmlFor='username'>Username</label>
        <input
            type='text'
            name='username'
            placeholder='Enter username'/>
        <label htmlFor='password'>Password</label>
        <input
            id='password'
            type='password'
            name='password'
            placeholder='Enter password'/>
        <input
            id='password2'
            type='password'
            name='password2'
            placeholder='Confirm password'/>
        <input
            type='submit'/>
      </form>
      <Link className='already-registered-btn' to='/login'>Already have an account?</Link>
    </div>
  )
}

export default RegisterPage
