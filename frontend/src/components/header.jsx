
import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Tabs, Tab, Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginDialog from './loginDialog.jsx';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../globalState.jsx';

const Header = ({ users, fixed }) => {
  const location = useLocation();
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [user] = state.userAPI.user;
  const [isAdmin] = state.userAPI.isAdmin;
  const logOutUser = state.userAPI.logOutUser;
  const [countCartItems] = state.cartAPI.countCartItems;

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(false);

  const tabs = [
    { label: 'Trang chủ', value: '/' },
    { label: 'Sản phẩm', value: '/products' },
    { label: 'Giới thiệu', value: '/about' },
    { label: 'Liên hệ', value: '/contact' },
  ];

  useEffect(() => {
    // Kiểm tra nếu `location.pathname` khớp với một trong các `tabs`, thì đặt nó làm `activeTab`
    const matchingTab = tabs.find(tab => tab.value === location.pathname);
    setActiveTab(matchingTab ? location.pathname : false);
  }, [location.pathname, tabs]);

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logOutUser();
    localStorage.removeItem("token");
    window.location.href = "/";
    handleAccountMenuClose();
  };

  const handleLoginSuccess = (user) => {
    setLoginDialogOpen(false); // Đóng dialog sau khi đăng nhập
  };

  return (
    <AppBar position={fixed ? 'fixed' : 'static'} color="primary">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Football Store
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tabs
            value={activeTab}
            indicatorColor="secondary"
            textColor="inherit"
            onChange={() => {}}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                component={Link}
                to={tab.value}
                style={{ color: 'white' }}
              />
            ))}
          </Tabs>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isLogged && !isAdmin && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/cart" 
                style={{ color: activeTab === '/cart' ? 'white' : 'inherit' }}
              >
                <Badge badgeContent={countCartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </Button>
            )}
            {isLogged ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {user.avatar || user.avatar.url ? (
                  <IconButton color="inherit" onClick={handleAccountClick}>
                    <Avatar 
                      alt={user.userName} 
                      src={user.avatar.url} 
                      sx={{ width: 32, height: 32, marginRight: 1 }} />
                  </IconButton>
                ) : (
                  <IconButton color="inherit" onClick={handleAccountClick}>
                    <AccountCircleIcon />
                  </IconButton>
                )}
              </div>
            ) : (
              <IconButton color="inherit" onClick={handleLoginDialogOpen}>
                <AccountCircleIcon />
              </IconButton>
            )}
          </div>
        </div>
        {isLogged ? (
          <Menu id="account-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleAccountMenuClose}>
            <MenuItem component={Link} to={`/profile/${user._id}`} user={user} onClick={handleAccountMenuClose}>
              Hồ sơ
            </MenuItem>
            {isAdmin ? (
              <MenuItem component={Link} to="/adminDashboard" onClick={handleAccountMenuClose}>
                Bảng điều khiển
              </MenuItem>
            ) : (
              <MenuItem component={Link} to="/userDashboard" onClick={handleAccountMenuClose}>
                Bảng điều khiển
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        ) : (
          <LoginDialog 
            users={users} 
            open={loginDialogOpen} 
            onClose={handleLoginDialogClose} 
            onLoginSuccess={handleLoginSuccess} // Truyền callback vào LoginDialog
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
