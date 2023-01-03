import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import useWindowSize from '../hooks/useWindowSize'

const Header = () => {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const sendLogout = useLogout()
  const { width } = useWindowSize()
  const [isShowingNav, setIsShowingNav] = useState()

  const signOut = async () => {
    toggleNav()
    await sendLogout()
    navigate('/')
  }

  const handleSignInBtnClicked = () => {
    toggleNav()
    navigate('/login')
  }

  const toggleNav = () => {
    setIsShowingNav(prev => !prev)
  }

  let loginOrLogoutContent = null
  if (auth?.accessToken) {
    loginOrLogoutContent = (
      <button 
        className="text-btn Header__sign-out"
        onClick={signOut}
      >
        Sign Out
      </button>
    )
  } else {
    loginOrLogoutContent = (
      <button 
        className="text-btn Header__sign-in"
        onClick={handleSignInBtnClicked}
      >
        Sign In
      </button>
    )
  }

  return (
    <header className="Header">

      <div className="Header__responsive">
        <Link className="Header__title-link" to="/"  onClick={() => setIsShowingNav(false)}>
          <h1 className='Header__title'><span>Bottoms! </span>UP</h1>
        </Link>
        
        {width < 750 &&
            <button
              className="Header__nav-toggle-btn"
              onClick={toggleNav}
            >
              <div className="Header__toggle-btn-icon"></div>
            </button>
          }
      </div>

      {(width > 750 || isShowingNav) &&
        <nav className="Header__nav">
          {auth?.accessToken &&
            <>
              <Link className="nav__link" to="/users"  onClick={toggleNav}>Users</Link>
              <Link className="nav__link" to="/cocktail"  onClick={toggleNav}>
                <span className="nowrap">Add Cocktail</span>
              </Link>
            </>
          }

          <Link className="nav__link" to="/about"  onClick={toggleNav}>About</Link>

          {auth?.accessToken &&
            <Link title="My Profile" className="nav__link Header__profile-link" to="/myprofile"  onClick={toggleNav}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          }
          {loginOrLogoutContent}
          
        </nav>
      }

    </header>
  )
}

export default Header