import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Paper, Typography, Grid, Link, Avatar, CircularProgress, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

const EditprofileDialog = ({ open, onClose }) => {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Check if passwords match
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    // Simulate signup process with loading state
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Signup with:', { userName, email, password, avatar });
    } finally {
      setLoading(false);
      // Close the dialog after signup
      onClose();
    }
  };

  const handleAvatarChange = (e) => {
    // Handle avatar file input change
    const file = e.target.files[0];
    if (file) {
      // Convert the image file to base64 format
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

//   <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
//         <DialogTitle>Edit Product</DialogTitle>
//         <DialogContent>
//             <TextField
//                 label="Name"
//                 fullWidth
//                 style={{ marginTop: '10px' }}
//                 value={newProduct.name}
//                 onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             />
//             <TextField
//                 label="Price"
//                 fullWidth
//                 style={{ marginTop: '10px' }}
//                 type="number"
//                 value={newProduct.price}
//                 onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             />
//             <TextField
//                 label="Category"
//                 fullWidth
//                 style={{ marginTop: '10px' }}
//                 value={newProduct.category}
//                 onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//             />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditDialog}>Cancel</Button>
//           <Button variant="contained" color="primary" onClick={handleEditProduct}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper elevation={3} sx={{ maxWidth: 400, padding: 3, position: 'relative' }}>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}>
          <CloseIcon />
        </IconButton>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              {avatar ? <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />}
              {/* <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} /> */}
            </Avatar>
          </Grid>
          <Grid item>
            <DialogTitle>
              <Typography variant="h5">Edit Profile</Typography>
            </DialogTitle>
          </Grid>
          <Grid item>
            <DialogContent>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Phone"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  startIcon={<PhotoCameraOutlinedIcon />}
                  sx={{ marginTop: 2 }}
                >
                  Upload Avatar
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'SAVE'}
              </Button>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Already have an account?{' '}
                <Link href="#" color="inherit" onClick={onClose}>
                  Login
                </Link>
              </Typography>
            </DialogContent>
          </Grid>
        </Grid>
      </Paper>
    </Dialog> 
  );
};

export default EditprofileDialog;