
import React, { useState, useEffect, useContext } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
  Typography,
  Paper,
  Container,
  Box,
} from '@mui/material';
import axios from 'axios';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../globalState.jsx';
import AddressSelector from './addressSelector.jsx';

const Profile = () => {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;
  const { logInUser } = state.userAPI.logInUser;
  const updateUser = state.userAPI.updateUser;
  const { logOutUser } = state.userAPI.logOutUser;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleAddressChange = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/api/image/upload', formData);
        const { public_id, url } = res.data;
        setAvatar({ public_id, url });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSaveProfile = async () => {
    const updateData = {
      userName: userName,
      phone: phone,
      city: address.city,
      district: address.district,
      ward: address.ward,
      street: address.street,
      avatar: avatar,
    };
    await updateUser(updateData);
    handleCloseEditDialog();
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, marginTop: 4 }}>
        <Grid2 container spacing={3}>
          <Grid2 item="true" xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={user?.avatar?.url || ''}
              alt="User Avatar"
              sx={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                marginBottom: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Grid2>
          <Grid2 item="true" xs={12} md={8}>
            <Box sx={{ paddingLeft: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {userName}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                Email: {email}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                Điện thoại: {phone}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                Địa chỉ: {`${address.street || ''}, ${address.ward || ''}, ${address.district || ''}, ${address.city || ''}`}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Phân quyền: {user?.role === 0 ? 'User' : user?.role === 1 ? 'Admin' : 'Vai trò chưa được xác định'}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 item="true" xs={12} sx={{ textAlign: 'center', marginTop: 4 }}>
            <Button variant="contained" color="primary" onClick={handleOpenEditDialog}>
              Cập nhật hồ sơ
            </Button>
          </Grid2>
        </Grid2>
      </Paper>

      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Cập nhật hồ sơ</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3}>
            <Grid2 
              item="true" 
              xs={12} 
              md={4} 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center' 
                }}
              >
              <Avatar
                src={avatarPreview}
                alt="User Avatar"
                sx={{
                  width: 150,
                  height: 150,
                  marginBottom: 2,
                  borderRadius: '50%',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span" fullWidth startIcon={<PhotoCameraOutlinedIcon />}>
                  Chọn ảnh đại diện
                </Button>
              </label>
            </Grid2>
            <Grid2 item="true" xs={12} md={8}>
              <TextField
                label="Tên người dùng"
                fullWidth
                size="small"
                variant="outlined"
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                size="small"
                variant="outlined"
                margin="normal"
                value={email}
                disabled
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                size="small"
                variant="outlined"
                margin="normal"
                value={phone || ''}
                onChange={(e) => setPhone(e.target.value)}
              />
              <AddressSelector userAddress={address || ''} onAddressChange={handleAddressChange} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSaveProfile} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;


