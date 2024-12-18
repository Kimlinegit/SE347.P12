import React, { useState, useRef, useEffect, useContext } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Grid, Card, CardMedia, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { GlobalState } from '../globalState';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';


const UserOrderHistory = () => {
  const state = useContext(GlobalState);
  const [orderHistory] = state.orderAPI.orderHistory;
  const userDeleteOrders = state.orderAPI.userDeleteOrders;
  const cancelOrder = state.orderAPI.cancelOrder;

  useEffect(() => {
    orderHistory
  },[]);
  

  const [Orders, setOrders] = useState(orderHistory || []);

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId);
  };

  const handleDeleteOrder = async (deletedOrder) => {
    const deletedOrders = Orders.filter((order) => order._id !== deletedOrder._id);
    await userDeleteOrders(deletedOrder._id);
    if(deletedOrder.status == "delivered") {
      setOrders(deletedOrders);
    }
  };
  
  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Lịch sử đơn hàng
      </Typography>

      {/* Table to display existing orders */}
      <TableContainer component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {/* <TableCell>User</TableCell> */}
              <TableCell>Phương thức thanh toán</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                {/* <TableCell>{order.user.userName}</TableCell> */}
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {/* <IconButton onClick={() => handleOpenEditDialog(order)} color="primary">
                    <EditIcon />
                  </IconButton> */}
                  <IconButton onClick={() => handleCancelOrder(order._id)} color="primary">
                    <CancelIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOrder(order)} style={{color: 'red'}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserOrderHistory;