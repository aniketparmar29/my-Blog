import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import RegisterUser from './RegisterUser'
const MainRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterUser/>}/>
    </Routes>
    </>
  )
}

export default MainRoutes