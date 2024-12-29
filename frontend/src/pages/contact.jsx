
import React from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  return (
    <Container style={{padding: 30, marginTop: 50}}>
      <Paper sx={{ my: 6, p: 4, borderRadius: 2, boxShadow: 4}}>
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          Liên hệ
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              elevation={3} 
              sx={{ p: 3, textAlign: 'center', bgcolor: '#f1f1f1', borderRadius: 2, minHeight: '230px' }}
            >
              <PhoneIcon fontSize="large" sx={{ color: '#00796b', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Số điện thoại
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Để liên hệ với chúng tôi, vui lòng gọi đến:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                (+84) 123 456 789
              </Typography>
              <Button variant="contained" color="success" sx={{ mt: 2, px: 4, textTransform: 'none' }} onClick={() => window.open("tel:+84123456789")}>
                Gọi ngay
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              elevation={3} 
              sx={{ p: 3, textAlign: 'center', bgcolor: '#f1f1f1', borderRadius: 2, minHeight: '230px' }}
            >
              <EmailIcon fontSize="large" sx={{ color: '#00796b', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Liên hệ chúng tôi qua Email:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Admin@gmail.com
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, px: 4, textTransform: 'none' }} onClick={() => window.open("mailto:Admin@gmail.com")}>
                Gửi email
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              elevation={3} 
              sx={{ p: 3, textAlign: 'center', bgcolor: '#f1f1f1', borderRadius: 2, minHeight: '230px' }}
            >
              <LocationOnIcon fontSize="large" sx={{ color: '#00796b', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Địa chỉ
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Ghé thăm cửa hàng tại địa chỉ:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                123 Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Contact;
