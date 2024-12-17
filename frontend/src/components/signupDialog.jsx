
import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Paper, Typography, Grid2, Link, Avatar, CircularProgress, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import axios from 'axios';
import { GlobalState } from '../globalState';

const SignupDialog = ({ open, onClose }) => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setPhone] = useState("");
  const [imageData, setImageData] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const state = useContext(GlobalState);
  const registerUser = state.userAPI.registerUser;



  const handleSignup = async () => {
    try {
      const res = await axios.post("/api/image/upload", imageData);
      console.log(res.data);
      const { public_id, url } = res.data;
      const avatar = res.data;
      const userData = {
        userName,
        email,
        password,
        confirmPass,
        phone,
        avatar 
      };
      console.log(userData);
      registerUser(userData);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      alert("Tạo tài thất bại, vui lòng kiểm tra lại đầy đủ thông tin!")
    }
    finally {
      setLoading(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPass('');
      setPhone('');
      setImageData(null);
      setAvatarPreview(null);
      onClose();
    }
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
        setImageData(formData);
      }
    } catch (error) {
      alert(error.response.data.message)
    }
    
  };



  return (
    <Dialog open={open} onClose={onClose}>
      <Paper elevation={3} sx={{ maxWidth: 400, padding: 3, position: 'relative' }}>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}>
          <CloseIcon />
        </IconButton>
        <Grid2 container direction="column" alignItems="center" spacing={2}>
          <Grid2 item="true">
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }} >
              {avatarPreview ? <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />}
            </Avatar>
          </Grid2>
          <Grid2 item="true">
            <DialogTitle>
              Đăng ký
              {/* <Typography variant="h5">Đăng ký</Typography> */}
            </DialogTitle>
          </Grid2>
          <Grid2 item="true">
            <DialogContent>
              <TextField
                // label="Username"
                label="Tên người dùng"
                variant="outlined"
                fullWidth
                size='small'
                margin="normal"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                size='small'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                // label="Password"
                label="Mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                size='small'
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
                // label="Confirm Password"
                label="Xác nhận mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                size='small'
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
              <TextField
                // label="Phone Contact"
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                margin="normal"
                size='small'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneOutlinedIcon />
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
                  size='small'
                  startIcon={<PhotoCameraOutlinedIcon />}
                  sx={{ marginTop: 2 }}
                >
                  {/* Upload Avatar */}
                  Chọn ảnh đại diện
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size='small'
                onClick={handleSignup}
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
              </Button>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                {/* Already have an account?{' '} */}
                Bạn đã có tài khoản?{' '}
                <Link href="#" color="inherit" onClick={onClose}>
                  {/* Login */}
                  Đăng nhập
                </Link>
              </Typography>
            </DialogContent>
          </Grid2>
        </Grid2>
      </Paper>
    </Dialog>
  );
};

export default SignupDialog;




