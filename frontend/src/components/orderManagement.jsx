
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, FormControl, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalState } from '../globalState';
import { Link } from 'react-router-dom';




const OrderManagement = () => {


  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;
  const updateStatus = state.orderAPI.updateStatus;
  const adminDeleteOrders = state.orderAPI.adminDeleteOrders
  console.log(orders);
  const [Orders, setOrders] = useState(orders|| []);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedOrder, setEditedOrder] = useState({});

  const handleOpenEditDialog = (order) => {
    setEditedOrder(order);
    setOpenEditDialog(true);
  };


  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedOrder({});
  };

  console.log(editedOrder);

  const handleEditOrder = () => {
    const updatedOrders = Orders.map((order) =>
      order._id === editedOrder._id ? editedOrder : order
    );
    setOrders(updatedOrders);
    const status = {newStatus: editedOrder.status};
    updateStatus(editedOrder._id, status)
    handleCloseEditDialog();
  };

  const handleDeleteOrder = async (deletedOrder) => {
    const deletedOrders = Orders.filter((order) => order._id !== deletedOrder._id);
    await adminDeleteOrders(deletedOrder._id);
    if(deletedOrder.status == "delivered" || deletedOrder.status == "cancelled") {
      setOrders(deletedOrders);
    }
  };

  
  console.log(Orders);
  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Quản trị đơn hàng
      </Typography>

      {/* Table to display existing orders */}
      <TableContainer component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Thanh toán</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  {/* Sử dụng Link để chuyển hướng */}
                  <Link to={`/order/${order._id}`}>
                    {order._id}
                  </Link>
                </TableCell>
                {/* <TableCell>{order._id}</TableCell> */}
                <TableCell>{order.user.userName}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(order)} color="primary">
                    <EditIcon />
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

      {/* Dialog for editing existing order */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Cập nhật đơn hàng</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: '10px' }} size='small'>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={editedOrder.status}
              onChange={(e) => setEditedOrder({ ...editedOrder, status: e.target.value })}
              label="Trạng thái"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} size='small'>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleEditOrder} size='small'>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderManagement;

