import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OrderAPI() {
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const [orderHistory, setOrderHistory] = useState([]);
    const [isOrderUpdate, setIsOrderUpdate] = useState(false);
    const [OrderItems, setOrderItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [address, setAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});

    const token = localStorage.getItem('token');

  const updateQuantity = (itemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };


  const updateAddress = (name, address) => {
    setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: address,
    }));
  };

  const updatePayment = (paymentMethod, value) => {
    setPaymentMethod((prevPaymentMethod) => ({
        ...prevPaymentMethod, 
        [paymentMethod]: value
    }));
  };



    useEffect(() => {
        fetchOrderData();
        getUserOrder();
        userOrderHistory();
        setIsOrderUpdate(false);
    }, [token, isOrderUpdate])

    const fetchOrderData = async () => {
        try {
            const res = await axios.get("/api/order", {
                headers: {Authorization: token}
            })
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error.message);
        }
    }

    const createOrder = async (orderData) => {
        if(token){
            try {
                const res = await axios.post("/api/order/create", orderData, {
                    headers: {Authorization: token}
                })
                console.log(res.data.message);
                setIsOrderUpdate(true);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const cancelOrder = async (orderId) => {
        if(token){
            try {
                const res = await axios.put(`/api/order/cancel/${orderId}`, null, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                setIsOrderUpdate(true);
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    }

    const getUserOrder = async () => {
        if(token){
            try {
                const res = await axios.get(`/api/order/detail`, {
                    headers: {Authorization: token}
                })
                setOrders(res.data);
                setIsOrderUpdate(true);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const userOrderHistory = async () => {
        if(token){
            try {
                const res = await axios.get(`/api/order/history`, {
                    headers: {Authorization: token}
                })
                setOrderHistory(res.data);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const adminDeleteOrders = async (orderId) => {
        if(token){
            try {
                const res = await axios.delete(`/api/order/admin/${orderId}`, {
                    headers: {Authorization: token}
                })
                alert(res.data.message)
                setIsOrderUpdate(!isOrderUpdate);
            } catch (error) {
                alert(error.response.data.message);
            }
        }
    }

    const userDeleteOrders = async (orderId) => {
        if(token){
            try {
                const res = await axios.delete(`/api/order/user/${orderId}`, {
                    headers: {Authorization: token}
                })
                alert(res.data.message)
                setIsOrderUpdate(!isOrderUpdate);
            } catch (error) {
                alert(error.response.data.message);
            }
        }
    }

    const getDetailOrder = async (orderId) => {
        try {
            const res = await axios.get(`/api/order/${orderId}`, {
                headers: {Authorization: token}
            })
            setOrderDetail(res.data);
            setIsOrderUpdate(!isOrderUpdate);
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateStatus = async (orderId, statusData) => {
        if(token){
            try {
                const res = await axios.put(`/api/order/${orderId}`, statusData, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                setIsOrderUpdate((prevValue) => !prevValue);
                return true;
                setIsOrderUpdate(!isOrderUpdate);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

  return {
    orders: [orders, setOrders],
    orderHistory: [orderHistory, setOrderHistory],
    OrderItems: [OrderItems, setOrderItems],
    quantities: [quantities, setQuantities],
    updateQuantity: updateQuantity,
    address: [address, setAddress],
    updateAddress: updateAddress,
    paymentMethod: [paymentMethod, setPaymentMethod],
    updatePayment: updatePayment,
    userDeleteOrders: userDeleteOrders,
    adminDeleteOrders: adminDeleteOrders,
    createOrder: createOrder,
    cancelOrder: cancelOrder,
    getDetailOrder: getDetailOrder,
    updateStatus: updateStatus,
    fetchOrderData: fetchOrderData,
    isOrderUpdate: [isOrderUpdate, setIsOrderUpdate]
  }
}

export default OrderAPI