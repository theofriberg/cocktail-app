import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ title }) => {
  return (
    <header className="Header">
      <h1 className='Header__title'><span>Bottoms! </span>UP</h1> 
      <nav className="Header__nav">
        <Link className="nav__link" to="/">Cocktails</Link>
        <Link className="nav__link" to="/cocktail"><span className="nowrap">Add Cocktail</span></Link>
        <Link className="nav__link" to="/about">About</Link>
      </nav>
    </header>
  )
}

export default Header