// import { Stack } from '@mui/material'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Location from './components/Location'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/homePage' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/location' element={<Location />} />
      </Routes>
    </>
  )
}

export default App
