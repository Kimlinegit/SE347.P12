
import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
  CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalState } from '../globalState.jsx';
import {CheckoutForm} from '../components/checkoutForm.jsx';
import EditQuantityDialog from '../components/editQuantityDialog.jsx';
import AddressSelector from '../components/addressSelector.jsx';


const stripePromise = loadStripe('pk_test_51MqHwRHnWtC5zdSFoamUdTdfJEPOJvSzFc30PTqI4knfRfg1p2LSFRthUOLnFGTrr6OcaK0l9n0TiEA1mfSislVA00u5wFgCTM');

const Cart = () => {


  const state = useContext(GlobalState);
  const [cartItems] = state.cartAPI.cartItems;
  const deleteFromCart = state.cartAPI.deleteFromCart;
  const [user] = state.userAPI.user;
  const createOrder = state.orderAPI.createOrder;


  const [orderData, setOrderData] = useState(null);

  const [activeStep, setActiveStep] = useState(0);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(user?.address || null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productSizes, setProductSizes] = useState([]);
  const [editingProductSize, setEditingProductSize] = useState("");


    const handleOpenEditDialog = (item) => {
      setEditingProductId(item.product._id);
      setProductSizes(item.product.sizes)
      setEditingProductSize(item.size);
      setProductQuantity(item.quantity); 
      setEditDialogOpen(true);
    };
  

    const handleCloseEditDialog = () => {
      setEditingProductId(null);
      setEditDialogOpen(false);
    };
  
  
    const handleUpdateQuantity = async (newQuantity) => {
      console.log(editingProductId, newQuantity);
    };

  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleOpenOrderDialog = () => {
    setOrderData({shippingAddress: shippingAddress, paymentMethod: paymentMethod});
    console.log(orderData);
    setOrderDialogOpen(true);
  };

  const handleCloseOrderDialog = () => {
    setOrderDialogOpen(false);
  };

  useEffect(() => {
    setOrderData({
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    });
  }, [shippingAddress, paymentMethod]);

  const handleCheckout = async () => {
    try {

      // Lưu orderData vào localStorage
    const orderDataToSave = {
      shippingAddress,
      paymentMethod: "creditcard"
    };
    localStorage.setItem("orderData", JSON.stringify(orderDataToSave));

      // Gửi request tới backend để tạo một Checkout Session
      const response = await axios.post('http://localhost:5000/create-checkout-session', {
        amount: totalAmount * 100, // Stripe yêu cầu số tiền tính bằng cents
        currency: 'usd',
      });

      const { id } = response.data;

      // Redirect người dùng tới Stripe Checkout
      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!');
    }
  };
  

  const handleOpenPaymentDialog = () => {
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
  };


  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cash') {
       await createOrder({
        shippingAddress: shippingAddress,
        paymentMethod: "cash"
      });
      alert(`Tạo đơn hàng thành công!`)
      handleCloseOrderDialog();
    } else { 
      setOrderData({shippingAddress: shippingAddress, paymentMethod: "creditcard"});
      handleCloseOrderDialog();

    } 
  };



  const handleAddressChange = (selectedAddress) => {
    setOrderData({shippingAddress:selectedAddress, paymentMethod: paymentMethod});
    setShippingAddress(selectedAddress);
  };

  const handleDeleteProductFromCart = (productId) => {
    deleteFromCart(productId);
  }


  return (
    <Container style={{padding: 30, marginTop: 50}}>
      <Paper sx={{ my: 6, p: 4, borderRadius: 2, boxShadow: 4}}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
          Giỏ hàng của bạn
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {cartItems.map((item) => (
              <div key={item._id}>
                <ListItem>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <CardMedia
                        component="img"
                        src={Array.isArray(item.product.images) ? item.product.images[0]?.url : ''}
                        alt={item.product.name} 
                        sx={{ width: 100, height: 100 }} 
                        style={{height: '50px', width: '50px', objectFit: 'cover'}} 
                      />
                    </Grid>
                    <Grid item>
                      <ListItemText
                        primary={item.product.name}
                        secondary={`Size: ${item.size} - Số lượng: ${item.quantity} - Giá: $${item.product.price} - Danh mục: ${item.product.category.name}`}
                      />
                    </Grid>
                    <Grid item>
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleOpenEditDialog(item)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProductFromCart(item.product._id)} style={{color: 'red'}}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Grid>
                  </Grid>
                </ListItem>
                {editingProductId && (
                  <EditQuantityDialog
                    open={editDialogOpen}
                    handleClose= {handleCloseEditDialog}
                    productId = {editingProductId}
                    productSizes = {productSizes}
                    currentSize = {editingProductSize}
                    currentQuantity= {productQuantity}
                    handleUpdate= {handleUpdateQuantity}               
                  />
                )}
                <Divider />
              </div>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Tổng số tiền: {totalAmount}$
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpenOrderDialog}>
            Đặt hàng
          </Button>
        </Paper>

        <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog} maxWidth="md" fullWidth>
          <DialogTitle>Đặt hàng</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step key={0}>
                <StepLabel>Sản phẩm</StepLabel>
              </Step>
              <Step key={1}>
                <StepLabel>Địa chỉ</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>Thanh toán</StepLabel>
              </Step>
            </Stepper>
              <List>
                {cartItems.map((item) => (
                  <div key={item._id}>
                    <ListItem>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <CardMedia
                            component="img"
                            src={item.product.images[0].url} 
                            alt={item.product.name} 
                            sx={{ width: 100, height: 100 }} 
                            style={{height: '50px', width: '50px', objectFit: 'cover'}} 
                          />
                        </Grid>
                        <Grid item>
                          <ListItemText
                            primary={item.product.name}
                            secondary={`Size: ${item.size} - Số lượng: ${item.quantity} đôi - Giá: ${item.product.price}$ - Category: ${item.product.category.name}`}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>

            {activeStep === 1 && (
              <div>
                <AddressSelector
                  userAddress = {user.address}
                  onAddressChange = {handleAddressChange}
                />
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Chọn phương thức thanh toán:
                </Typography>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="payment-method-label">Phương thức thanh toán</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    label="Phương thức thanh toán"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value="cash">Thanh toán khi nhận hàng (Cash)</MenuItem>
                    <MenuItem value="creditcard">Thẻ tín dụng (Credit Card)</MenuItem>
                  </Select>
                </FormControl>
                {/* {paymentMethod == "creditcard" && (
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCheckout}>
                      Thanh toán
                  </Button>
                )} */}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            {activeStep > 0 && (
              <Button onClick={handlePrevStep} color="primary">
                Quay lại
              </Button>
            )}
            {activeStep < 2 && (
              <Button onClick={handleNextStep} color="primary">
                Tiếp tục
              </Button>
            )}
            {activeStep === 2 && (
              paymentMethod == "creditcard" ?
                <Button color="primary" onClick={handleCheckout}>
                  Đặt hàng
                </Button> :
                <Button onClick={handlePlaceOrder} color="primary">
                  Đặt hàng
                </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={paymentDialogOpen} onClose={handleClosePaymentDialog} maxWidth="md" fullWidth>
          <DialogTitle>Thông tin thanh toán</DialogTitle>
          <DialogContent>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm orderAddress = {shippingAddress} paymentMethod = {paymentMethod} cart= {cart}/>
              </Elements>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClosePaymentDialog}>
              Hủy bỏ
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Cart;
