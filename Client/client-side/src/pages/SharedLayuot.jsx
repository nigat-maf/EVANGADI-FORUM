import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import LandingPage from './LandingPage'


function SharedLayuot() {
  return (
  <>
  <Navbar/>
  <Outlet/>
  <Footer/>
  </>
  )
}

export default SharedLayuot