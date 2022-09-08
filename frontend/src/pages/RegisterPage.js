import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  let {registerUser} = useContext(AuthContext)

  return (
    <div>
      <form onSubmit={registerUser}>
      <input
            type='text'
            name='first_name'
            placeholder='Enter firstname'/>
        <input
            type='text'
            name='last_name'
            placeholder='Enter lastname'/>
        <input
            type='text'
            name='email'
            placeholder='Enter email'/>                        
        <input
            type='text'
            name='username'
            placeholder='Enter username'/>
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
    </div>
  )
}

export default RegisterPage
