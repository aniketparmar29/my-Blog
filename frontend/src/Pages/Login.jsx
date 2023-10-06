import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
    <Navbar/>
    <Link to={"/Register"}>don't have Account?</Link>
    <Footer/>
    </>
  )
}

export default Home