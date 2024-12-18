import React, { useState, useContext } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalState } from '../globalState';


const UserManagement = () => {


  const state = useContext(GlobalState);
  const [users] = state.userAPI.users;
  const updateRole = state.userAPI.updateRole;
  const deleteUser = state.userAPI.deleteUser;



  const [Users, setUsers] = useState(users?users:[]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [newUser, setNewUser] = useState({});

  const handleOpenEditDialog = (user) => {
    setEditedUser(user);
    setOpenEditDialog(true);
  }

  const handleDeleteUser = (userId) => {
    const updatedUsers = Users.filter((user) => user._id !== userId);
    setUsers(updatedUsers);
    deleteUser(userId);
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  }

  const handleEditUser = () => {
    const updatedUsers = Users.map((user) =>
      user._id === editedUser._id ? editedUser : user
    );
    setUsers(updatedUsers);
    const newRole = {newRole: editedUser.role};
    updateRole(editedUser._id, newRole);
    handleCloseEditDialog();
  }


  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Quản trị người dùng
      </Typography>

      {/* Table to display existing users */}
      <TableContainer component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phân quyền</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>
                  <Avatar 
                    src={user.avatar.url} 
                    alt="User Avatar" 
                    sx={{ width: 100, height: 100 }} 
                    style={{height: '50px', width: '50px', objectFit: 'cover'}} 
                  />
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role == 0 ? "User" : "Admin"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user._id)} style={{color: 'red'}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for editing existing product */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Cập nhật người dùng</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: '10px' }} size='small'>
            <InputLabel>Phân quyền</InputLabel>
            <Select
              value={editedUser.role}
              onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
              label="Phân quyền"
            >
              <MenuItem value="0">user</MenuItem>
              <MenuItem value="1">admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} size='small'>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleEditUser} size='small'>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;