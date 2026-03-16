import Button from '@mui/material/Button';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import BrandDetails from './pages/BrandDetails';
import Home from './pages/Home';
import './App.css'

function App() {
  

  return (
    <BrowserRouter>

      <Routes>
          <Route path="/" element ={<Home/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/brands/:id" element={<BrandDetails />}></Route>

      </Routes>

</BrowserRouter>
  )
}

export default App
