// OrderHistory.js
import React, { useState, useEffect, useContext } from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { GlobalState } from '../globalState'; // Import global state context

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;
  const [orderHistory] = state.orderAPI.orderHistory;
  // const { orders, orderHistory } = orderAPI;
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         await getOrdersByUser(); // Fetch orders for the current user
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching orders:', error.message);
//       }
//     };

//     fetchOrders();
//   }, [getOrdersByUser]);

  console.log(orderHistory);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {orderHistory.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Cart Price</TableCell>
                <TableCell>Shipping Cost</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.cartPrice}</TableCell>
                  <TableCell>{order.shippingCost}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderHistory;
