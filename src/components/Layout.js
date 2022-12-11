import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <div className='App'>
      <Header title='Bottoms! UP'/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout