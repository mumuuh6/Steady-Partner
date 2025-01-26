
import './App.css'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
function App() {
  
  return (
    <div className='max-w-6xl mx-auto mt-4'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
