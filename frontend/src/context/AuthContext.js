import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        // navigate('/login')
    }

    let registerUser = async (e) => {
        if (e.target.password.value === e.target.password2.value){
            e.preventDefault()
            let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'first_name': e.target.first_name.value,
                'last_name': e.target.last_name.value,
                'email': e.target.email.value,
                'username': e.target.username.value,
                'password': e.target.password.value,
                'password2': e.target.password2.value,
            })
            });

            if (response.status === 201) {
                navigate('/login')
            } else {
            alert('Something went wrong!');
            }
        } else {
            alert('You entered two different passwords!')
            }
    };

    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        registerUser:registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
          setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
