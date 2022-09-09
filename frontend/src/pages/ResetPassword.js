import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const ResetPassword = () => {
  let {resetUserPassword} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={resetUserPassword}>
        <input
            type='password'
            name='password'
            placeholder='Enter password'/>
        <input
            type='password'
            name='password2'
            placeholder='Confirm password'/>
        <input
            type='submit'/>
      </form>
    </div>
  )
}

export default ResetPassword
