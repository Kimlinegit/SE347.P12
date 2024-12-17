// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid2,
//   TextField,
//   Typography,
//   Paper,
//   Container,
// } from '@mui/material';
// import axios from 'axios';
// import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
// import { useParams } from 'react-router-dom';
// import { GlobalState } from '../globalState.jsx';
// import AddressSelector from './addressSelector.jsx';

// const Profile = () => {

//   const state = useContext(GlobalState);
//   // const {logInUser, isAdmin, isLogged, logOutUser, updateUser, user} = userAPI;
//   const [user] = state.userAPI.user;
//   const [isAdmin] = state.userAPI.isAdmin;
//   const [isLogged] = state.userAPI.isLogged;
//   const {logInUser} = state.userAPI.logInUser;
//   const updateUser = state.userAPI.updateUser;
//   const {logOutUser} = state.userAPI.logOutUser;


//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [userName, setUserName] = useState(user?.userName||"");
//   const [email, setEmail] = useState(user?.email||"");
//   const [phone, setPhone] = useState(user?.phone||"");
//   const [address, setAddress] = useState(user?.address||"");
//   const [imageData, setImageData] = useState(null);
//   const [avatar, setAvatar] = useState(user?.avatar||null);
//   const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url||"");
//   const [updateAddress, setUpdateAddresss] = useState(null);
//   const [phoneUpdate, setPhoneUpdate] = useState("");
//   const [cityUpdate, setCityUpdate] = useState("");
//   const [districtUpdate, setDistrictUpdate] = useState("");
//   const [wardUpdate, setWardUpdate] = useState("");
//   const [streetUpdate, setStreetUpdate] = useState("");

  

//   const [updateInfo, setUpdateInfo] = useState(null)
//   const [newAvatar, setNewAvatar] = useState(null)

//   const handleOpenEditDialog = () => {
//     setIsEditDialogOpen(true);
//   };

//   const handleCloseEditDialog = () => {
//     setIsEditDialogOpen(false);
//   };

//   const handleAddressChange = (selectedAddress) => {
//     setAddress(selectedAddress);
//     setUpdateAddresss(selectedAddress);
//   };



//   const handleAvatarChange = async (e) => {
//     e.preventDefault();
//     try {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setAvatarPreview(reader.result);
//         };
//         reader.readAsDataURL(file);
//         let formData = new FormData();
//         formData.append('file', file);
//         const res = await axios.post("/image/upload", formData);
//         console.log(res.data);
//         const { public_id, url } = res.data;
//         setAvatar({ public_id, url });
//       }
//     } catch (error) {
//       alert(error.response.data.message)
//     }
//   };


//   const handleSaveProfile = async () => {
//     const updateData = {
//       userName: userName,
//       phone: phone,
//       city: address.city,
//       district: address.district,
//       ward: address.ward,
//       street: address.street,
//       avatar: avatar
//     }
//     console.log(updateData);
//     await updateUser(updateData);
//     setUpdateInfo(updateData);
//     handleCloseEditDialog();
//   };


//     const cityUpdate1 = cityUpdate;
//     const districtUpdate1 = districtUpdate;
//     const wardUpdate1 = wardUpdate;
//     const streetUpdate1 = streetUpdate;
//     const updateData1 = {
//       userName: userName,
//       phone: phone,
//       city: cityUpdate1,
//       district: districtUpdate1, 
//       ward: wardUpdate1,
//       street: streetUpdate1,
//       avatar: avatar
//     }

  

//   return (
//     <Container>
//       <Paper elevation={3} sx={{ padding: 3 }} style={{ height: '70vh', margin: '10px 150px'}}>
//         <Grid2 container spacing={3}>
//           {/* Phần bên trái: Avatar */}
//           <Grid2 item="true" xs={4}>
//             <Avatar src={user?.avatar?.url || ''} alt="User Avatar" sx={{ width: 100, height: 100 }} style={{height: '150px', width: '150px', objectFit: 'cover'}} />
//           </Grid2>
//           {/* Thông tin cá nhân */}
//           <Grid2 item="true" xs={8}>
//             <Typography variant="h4">{userName}</Typography>
//             <Typography variant="body1">Email: {email}</Typography>
//             <Typography variant="body1">Điện thoại: {phone}</Typography>
//             <Typography variant="body1">Địa chỉ: {`${address.street || ""}, ${address.ward || ''}, ${address.district || ''}, ${address.city || ''}`}</Typography>
//             {/* <Typography variant="body1">Phân quyền: {user.role == 0 ? "user" : "admin"}</Typography> */}
//             <Typography variant="body1">
//               Phân quyền: {user?.role === 0 ? "user" : user?.role === 1 ? "admin" : "Vai trò chưa được xác định"}
//             </Typography>

//           </Grid2>
//           {/* Nút chỉnh sửa */}
//           <Button 
//             variant="contained" 
//             color="primary" 
//             style={{ marginTop: '200px', justifyItems: 'center' }}
//             onClick={handleOpenEditDialog}
//           >
//             Cập nhật hồ sơ
//           </Button>
//         </Grid2>
//       </Paper>

//       {/* Dialog chỉnh sửa thông tin cá nhân */}
//       <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
//         <DialogTitle>Cập nhật hồ sơ</DialogTitle>
//         <DialogContent>
//           <Grid2 container spacing={3}>
//             {/* Avatar và nút upload */}
//             <Grid2 item="true" xs={4} style={{textAlign: 'center'}}>
//               <Avatar
//                 src= {avatarPreview}
//                 alt="User Avatar"
//                 sx={{ width: 100, height: 100, marginBottom: 2 }}
//                 style={{width: '150px', height: '150px', marginLeft: '60px'}}
//               />
//               <input
//                 accept="image/*"
//                 style={{display: 'none'}}
//                 id="avatar-upload"
//                 type='file'
//                 onChange={handleAvatarChange}
//               />
//               <label htmlFor="avatar-upload">
//                 <Button 
//                   variant="outlined"
//                   component="span"
//                   fullWidth
//                   startIcon={<PhotoCameraOutlinedIcon />}
//                   sx={{ marginTop: 2 }}
//                 >
//                   Chọn ảnh đại diện
//                 </Button>
//               </label>
//             </Grid2>

//             {/* TextField để chỉnh sửa thông tin */}
//             <Grid2 item="true" xs={8}>
//               <TextField
//                 // label="userName"
//                 label="Tên người dùng"
//                 fullWidth
//                 size='small'
//                 variant="outlined"
//                 margin="normal"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//               <TextField
//                 label="Email"
//                 fullWidth
//                 size='small'
//                 variant="outlined"
//                 margin="normal"
//                 value={user?.email || ""}
//                 disabled={true}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 // label="Phone"
//                 label="Số điện thoại"
//                 fullWidth
//                 size='small'
//                 variant="outlined"
//                 margin="normal"
//                 value={phone || ""}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//               <AddressSelector
//                 userAddress={address || ""}
//                 onAddressChange={handleAddressChange}
//                 userAvatar={avatarPreview}
//                 onAvatarChange={handleAvatarChange}

//               />
//             </Grid2>
//           </Grid2>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditDialog} color="primary">
//             {/* Cancel */}
//             Hủy
//           </Button>
//           <Button onClick={handleSaveProfile} color="primary">
//             {/* Save */}
//             Lưu
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Profile;






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


