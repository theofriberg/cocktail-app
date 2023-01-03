import './auth.css'
import { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { USERS_URL as REGISTER_URL } from '../../api/apiURL'
import axios from '../../api/axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()
    
    const [username, setUsername] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [username, pwd, matchPwd])

    const handleUserSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(username)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg('Invalid entry')
            return;
        }
        const data = { username, password: pwd }
        try {
           await axios.post(REGISTER_URL, data, {
                withCredentials: true
            })
            setSuccess(true)
            setUsername('')
            setPwd('')
            setMatchPwd('')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username already taken')
            } else {
                setErrMsg('Registration failed')
            }
            errRef.current.focus()
        }
    }

  return (
    <>
        {success ? (
            <section className="Register">
                <h1>Sign in</h1>
                <p>
                    <Link to="/login">Sign in</Link>
                </p>
            </section>
        ) : (
            <section className="Register">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
                <h1>Sign up</h1>
                <form className="Register__form" onSubmit={handleUserSubmit}>
                    <label className="Register__label" htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !username ? 'hide' : 'invalid'} />
                    </label>
                    <input
                        className="Register__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        value={username}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        required
                    />
                    <p id="uidnote" className={userFocus && username && !validName ? "Register__instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
                    </label>
                    <input
                        className="Register__input"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        required
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "Register__instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
                    </label>
                    <input
                        className="Register__input"
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "Register__instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button className="text-btn Register__sign-up-btn" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                </form>
                <p className="Register__sign-in-link">
                    Already registered?<br />
                    <Link to="/login">Sign in</Link>
                </p>
            </section>
        )}
    </>
  )
}

export default Register