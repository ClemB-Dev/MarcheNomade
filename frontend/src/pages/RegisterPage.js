import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(first_name, last_name, email, username, password, password2);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
            type='text'
            name='first_name'
            onChange={e => setFirstname(e.target.value)}
            placeholder='Enter firstname'/>
        <input
            type='text'
            name='last_name'
            onChange={e => setLastname(e.target.value)}
            placeholder='Enter lastname'/>
        <input
            type='text'
            name='email'
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter email'/>                        
        <input
            type='text'
            name='username'
            onChange={e => setUsername(e.target.value)}
            placeholder='Enter username'/>
        <input
            id='password'
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter password'/>
        <input
            id='confirm-password'
            type='password'
            name='password'
            onChange={e => setPassword2(e.target.value)}
            placeholder='Confirm password'/>
        <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        <input
            type='submit'/>
      </form>
    </div>
  )
}

export default RegisterPage
