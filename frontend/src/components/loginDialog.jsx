
import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Paper, Typography, Grid2, Link, Avatar, CircularProgress, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SignupDialog from './signupDialog.jsx';
import { GlobalState } from '../globalState.jsx'; 
import axios from 'axios';

function LoginDialog({  open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const state = useContext(GlobalState);
  const logInUser = state.userAPI.logInUser;

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {

      const loginSuccess = await logInUser({...userCredentials});
      if (loginSuccess) {
        setLoggedIn(true);
        onClose(); 
      }
      
    } catch(err) {
      setLoginError(err.response.data.message);
    } finally {
      setLoading(false);
    }
    setUserCredentials({
      email: "",
      password: "",
    })
    // onClose();
  };

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  return (
    <Dialog open={open && !loggedIn} onClose={onClose}>
      <Paper elevation={3} sx={{ maxWidth: 400, padding: 3, position: 'relative' }}>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}>
          <CloseIcon />
        </IconButton>
        <Grid2 container direction="column" alignItems="center" spacing={2}>
          <Grid2 item="true">
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />
            </Avatar>
          </Grid2>
          <Grid2 item="true">
            <DialogTitle>
              Đăng nhập
            </DialogTitle>
          </Grid2>
          <Grid2 item="true">
            <DialogContent>
              <TextField
                label="Email"
                type="email"
                name='email'
                variant="outlined"
                fullWidth
                margin="normal"
                size='small'
                value={userCredentials.email}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Mật khẩu"
                type="password"
                name='password'
                variant="outlined"
                fullWidth
                margin="normal" 
                size='small'
                value={userCredentials.password}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size='small'
                onClick={handleLogin}
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
              </Button>
              {/* <Typography variant="body2" sx={{ marginTop: 2 }}>
                <Link href="#" color="inherit">
                  Quên mật khẩu
                </Link>
              </Typography> */}
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Chưa có tài khoản?{' '}
                <Link href="#" color="inherit" onClick={handleSignupOpen}>
                  Đăng ký
                </Link>
              </Typography>
            </DialogContent>
          </Grid2>
        </Grid2>
      </Paper>
      <SignupDialog open={signupOpen} onClose={handleSignupClose} />
    </Dialog>
  );
};

export default LoginDialog;





