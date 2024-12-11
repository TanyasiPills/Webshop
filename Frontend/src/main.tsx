import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { NavBar } from './assets/components/navbar.tsx'
import { ProductListing } from './assets/components/products.tsx'
import { Login } from './assets/components/login.tsx'
import { Registering } from './assets/components/register.tsx'
import { Profile } from './assets/components/profile.tsx'
import { Cart } from './assets/components/cart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route index element={<ProductListing/>}/>
          <Route path='register' element={<Registering/>} />
          <Route path='login' element={<Login/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='cart' element={<Cart/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
