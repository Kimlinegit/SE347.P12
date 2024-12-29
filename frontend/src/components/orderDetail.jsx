
import React, { useRef, useEffect, useContext, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GlobalState } from '../globalState.jsx';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const qrCodeRef = useRef(null);
  const { orderId } = useParams();
  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;

  const [Orders, setOrders] = useState(orders || []);
  const orderData = Orders.find((p) => p._id === String(orderId));
  const [address, setAddress] = useState(orderData?.shippingAddress || {});

  useEffect(() => {
    if (qrCodeRef.current) {
      const qrCodeCanvas = qrCodeRef.current.children[0];
      const qrCodeDataURL = qrCodeCanvas.toDataURL('image/png');
    }
  }, []);

  const handleExportPDF = async () => {
    try {
      const pdfDoc = new jsPDF('p', 'mm', 'a4');
      const canvas = await html2canvas(document.getElementById('order-details'));
      const imageData = canvas.toDataURL('image/png');
      pdfDoc.addImage(imageData, 'PNG', 10, 10, 190, 277);
      pdfDoc.save('order-details.pdf');
    } catch (error) {
      console.error('Lỗi khi xuất PDF:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
      <Paper
        id="order-details"
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textAlign: 'center',
          }}
        >
          Chi tiết đơn hàng
        </Typography>

        <Grid container spacing={3}>
          {/* Thông tin cửa hàng */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: '#1976d2', fontWeight: 'bold' }}
              >
                Thông tin cửa hàng
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Tên cửa hàng: Football Store" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Địa chỉ: 123 Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Số điện thoại: (+84) 123 456 789" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email: Admin@gmail.com" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Sản phẩm */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: '#1976d2', fontWeight: 'bold' }}
              >
                Sản phẩm
              </Typography>
              <List>
                {orderData.cart.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <ListItem>
                      <ListItemText
                        primary={`Sản phẩm ${index + 1}: ${item.product.name}`}
                        secondary={`Size: ${item.size}, Số lượng: ${item.quantity}`}
                      />
                    </ListItem>
                    {index < orderData.cart.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Thông tin đơn hàng */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: '#1976d2', fontWeight: 'bold' }}
              >
                Thông tin đơn hàng
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Mã đơn hàng: ${orderData._id}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Khách hàng: ${orderData.user.userName}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Số điện thoại: ${orderData.user.phone}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Địa chỉ: ${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Ngày đặt hàng: ${orderData.createdAt}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Phương thức thanh toán: ${orderData.paymentMethod}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Trạng thái đơn hàng: ${orderData.status}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Giá trị đơn hàng: $${orderData.cartPrice}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Phí vận chuyển: $${orderData.shippingCost}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Tổng giá trị đơn hàng: $${orderData.totalPrice}`}
                  />
                </ListItem>
              </List>
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <QRCodeCanvas value={`${orderData._id}`} size={100} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportPDF}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            textAlign: 'center',
          }}
        >
          Xuất PDF
        </Button>
      </Box>
    </Container>
  );
}

export default OrderDetails;

