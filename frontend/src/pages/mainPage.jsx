import React, { useContext } from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './home.jsx';
import Product from './product.js';
import ProductDetail from '../components/productDetail.jsx';
import About from './about.jsx';
import Contact from './contact.jsx';
import Cart from './cart.jsx';
import Profile from '../components/profile.jsx';
import Dashboard from '../components/dashboard.jsx';





const MainPage = () => {

  
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    )
  }
  
  export default MainPage