
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Home from './home.jsx';
import Product from './product.jsx';
import ProductDetail from '../components/productDetail.jsx';
import About from './about.jsx';
import Contact from './contact.jsx';
import Cart from './cart.jsx';
import Profile from '../components/profile.jsx';
import Dashboard from '../components/dashboard.jsx';
import UserDashboard from '../components/userDashboard.jsx';
import OrderDetails from '../components/orderDetail.jsx';
import PaymentSuccess from '../components/paymentSuccess.jsx';
import { GlobalState } from '../globalState.jsx';
import { CheckoutForm, Return } from '../components/checkoutForm.jsx';




function Pages() {
    const state = useContext(GlobalState);
    const [user] = state.userAPI.user;
    return (
        <Router>
            <Header user={user} fixed={true}/>
            {/* <div style={{ minHeight: 'calc(100vh - 20vh)', marginTop: '85px', paddingBottom: '20px', backgroundColor: '#f9f9f9'}}> */}
            <div style={{backgroundColor: '#f9f9f9', minHeight: '80vh'}}>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/products/:productId" element={<ProductDetail/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile/:userId" element={<Profile/>} />
                    <Route path="/adminDashboard" element={<Dashboard />} />
                    <Route path="/userDashboard" element={<UserDashboard />} />
                    <Route path="/order/:orderId" element={<OrderDetails />} />
                    <Route path="/checkout" element={<CheckoutForm />} />
                    <Route path="/paymentSuccess" element={<PaymentSuccess />} />
                </Routes>
            </div>
            <Footer/>
        </Router>
    )
  }
  
  export default Pages