

import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CartAPI() {
  const [cartItems, setCartItems] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUserCart = async () => {
    try {
      const res = await axios.get('/api/cart/items', {
        headers: { Authorization: token },
      });
      setCartItems(res.data.cartItems);
      setCountCartItems(res.data.cartItems.length);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserCart();
    }
  }, [token, isCartUpdated, cartItems]);

  const addToCart = async (productId, size) => {
    try {
      const res = await axios.post(`/api/cart/${productId}`, size, {
        headers: { Authorization: token },
      });
      console.log(res.data)
      alert(res.data.message);
      setCartItems(res.data.cart.items); // Update the cartItems directly
      setCountCartItems(res.data.cart.items.length);
      setIsCartUpdated(!isCartUpdated);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

    // Update cart items and count when there are changes in the cart
    const updateCartItems = (newCartItems) => {
      setCartItems(newCartItems);
      setCountCartItems(newCartItems.length);
    };

  const updateCart = async (productId, quantity) => {
    try {
      const res = await axios.put(`/api/cart/${productId}`, quantity, {
        headers: { Authorization: token }
      });
      console.log(res);
      alert(res.data.message);
      setCartItems(res.data.cart.items);
      setCountCartItems(res.data.cart.items.length);
      setIsCartUpdated(!isCartUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/${productId}`, {
        headers: { Authorization: token },
      }); 
      alert(res.data.message);
      setCartItems(res.data.cart.items);
      setCountCartItems(res.data.cart.items.length);
      setIsCartUpdated(!isCartUpdated);
    } catch (err) {
      console.log(err.message);
    }
  };

  const payment = async (totalPrice) => {
    try {
      const res = await axios.post("/payment/create-payment-intent", totalPrice);
    } catch (error) {
      console.log(error.message);
    }
  }


  return {
    cartItems: [cartItems, setCartItems],
    countCartItems: [countCartItems, setCountCartItems],
    addToCart: addToCart,
    updateCart: updateCart,
    deleteFromCart: deleteFromCart,
    payment: payment
  };
}

export default CartAPI;

