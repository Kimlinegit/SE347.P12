// import React, {useContext} from 'react';
// import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
// import { CheckCircleOutline as CheckCircleIcon } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { GlobalState } from '../globalState';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   const state = useContext(GlobalState);
//   const createOrder = state.orderAPI.createOrder;

// const handleBackToHome = async () => {
//     const orderData = JSON.parse(localStorage.getItem("orderData"));
//     if (orderData) {
//     try {
//         await createOrder(orderData);
//         localStorage.removeItem("orderData"); // Xóa dữ liệu sau khi xử lý xong
//     } catch (error) {
//         console.error("Error creating order:", error);
//         alert("Đặt hàng thất bại. Vui lòng thử lại!");
//     }
//     }
//     navigate('/');
//   };

//   const handleViewOrder = () => {
//     navigate('/orders'); // Hoặc bất kỳ route nào để xem đơn hàng của người dùng
//   };

//   return (
//     <Container maxWidth="md">
//       <Box textAlign="center" sx={{ mt: 5 }}>
//         <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
//         <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: '#4caf50' }}>
//           Thanh toán thành công!
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 2 }}>
//           Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xử lý thành công.
//         </Typography>

//         <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//             Thông tin đơn hàng
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" color="textSecondary">
//                 Mã đơn hàng: <strong>#123456789</strong>
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" color="textSecondary">
//                 Phương thức thanh toán: <strong>Thẻ tín dụng</strong>
//               </Typography>
//             </Grid>
//           </Grid>
//         </Paper>

//         <Box sx={{ mt: 4 }}>
//           <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleBackToHome}>
//             Quay lại trang chủ
//           </Button>
//           <Button variant="outlined" color="primary" onClick={handleViewOrder}>
//             Xem đơn hàng
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default PaymentSuccess;



import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CheckCircleOutline as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../globalState';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const createOrder = state.orderAPI.createOrder;

  // State to control the dialog visibility
  const [openDialog, setOpenDialog] = useState(true);

  const handleBackToHome = async () => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    if (orderData) {
      try {
        await createOrder(orderData);
        localStorage.removeItem("orderData"); // Xóa dữ liệu sau khi xử lý xong
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Đặt hàng thất bại. Vui lòng thử lại!");
      }
    }
    navigate('/');
  };

  const handleViewOrder = () => {
    navigate('/userDashboard'); // Hoặc bất kỳ route nào để xem đơn hàng của người dùng
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  useEffect(() => {
    // Automatically show the dialog when the component is loaded
    setOpenDialog(true);
  }, []);

  return (
    <Container maxWidth="md">
      <Dialog 
        open={openDialog} 
        onClose={() => {}} // Giữ nguyên onClose không làm gì khi bấm ngoài
        disableBackdropClick  // Disable closing by clicking outside the dialog
        disableEscapeKeyDown  // Disable closing by pressing ESC
      >
        <DialogTitle>Thanh toán thành công!</DialogTitle>
        <DialogContent>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: '#4caf50' }}>
              Thanh toán thành công!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xử lý thành công.
            </Typography>

            <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Thông tin đơn hàng
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Mã đơn hàng: <strong>#123456789</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Phương thức thanh toán: <strong>Thẻ tín dụng</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackToHome} color="primary">
            Quay lại trang chủ
          </Button>
          <Button onClick={handleViewOrder} color="primary">
            Xem đơn hàng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentSuccess;


