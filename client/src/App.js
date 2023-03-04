import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Location from './components/Location'
import Welcome from './components/Welcome'
import Todos from './components/Todos'
import Gallery from './components/Gallery/Gallery'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Welcome />} />
      <Route exact path='/homePage' element={<HomePage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/location' element={<Location />} />
      <Route path='/todos' element={<Todos />} />
      {/* <Route path='/expense' element={<Expense />} /> */}
      <Route path='/gallery' element={<Gallery />} />
    </Routes>
  )
}

export default App
