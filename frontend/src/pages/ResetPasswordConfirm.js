import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const ResetPasswordMail = () => {
  let {sendResetPasswordMail} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={sendResetPasswordMail}>
        <input
            type='email'
            name='email'
            placeholder='Enter email'/>
        <input
            type='submit'/>
      </form>
    </div>
  )
}

export default ResetPasswordMail
