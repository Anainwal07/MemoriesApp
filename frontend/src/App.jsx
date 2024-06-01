import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login  from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import { UserProvider } from '../UserContext.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' Component={Login} />
      <Route path='/signup' Component={Signup} />
      <Route path='/dashboard' Component={HomePage}/>
      <Route path='/profile' Component={HomePage}></Route>
    </Routes>
    </>
  )
}

export default App