import './auth.css'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LOGIN_URL } from '../../api/apiURL'
import useAuth from '../../hooks/useAuth'
import useInput from '../../hooks/useInput'
import useToggle from '../../hooks/useToggle'
import axios from '../../api/axios'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const userRef = useRef()
    const errRef = useRef()
    
    const { setAuth } = useAuth()
    
    const [user, resetUser, userAttributes] = useInput('user', '')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [check, toggleCheck] = useToggle('persist', false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const data = { username: user, password: pwd }
        try {
            const response = await axios.post(LOGIN_URL, data, { withCredentials: true })
            const roles = response?.data?.roles
            const userId = response?.data?.userId
            const accessToken = response?.data?.accessToken
            setAuth({ userId, roles, accessToken })
            resetUser()
            setPwd('')
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus()
        }

    }

  return (
    <section className="Login">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <form className="Login__form" onSubmit={handleLoginSubmit}>
            <label className="Login__label" htmlFor="username">Username</label>
            <input 
                className="Login__input"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                {...userAttributes}
                required
            />

            <label className="Login__label" htmlFor="password">Password</label> 
            <input 
                className="Login__input"
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
            />
            <button className="text-btn Login__sign-in-btn">Sign in</button>
            <div className="Login__checkbox">
                <input 
                    type="checkbox"
                    id="persist"
                    onChange={toggleCheck}
                    checked={check}
                />
                <label className="Login__label" htmlFor="persist">Trust This Device</label>
            </div>
        </form>
        <p className="Login__sign-up-link">
            Need an account?<br />
            <Link to="/register">Sign Up</Link>
        </p>
    </section>
  )
}

export default Login