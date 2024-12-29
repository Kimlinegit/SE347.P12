import React from 'react';
import { Container, Grid2, Paper, Typography, Button } from '@mui/material';

const About = () => {
  return (
    <Container style={{padding: 30, marginTop: 50}}>
      <Paper sx={{ my: 6, p: 4, borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
          Giới thiệu về chúng tôi
        </Typography>
        <Typography variant="body1" paragraph>
          Chào mừng đến với cửa hàng giày bóng đá - nơi bạn có thể tìm thấy những đôi giày chất lượng hàng đầu
          để nâng cao trình độ của mình trên sân cỏ.
        </Typography>
        <Typography variant="body1" paragraph>
          Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng, từ những thương hiệu uy tín trên thị trường.
          Sự thoải mái, độ bền và phong cách là những yếu tố chúng tôi luôn chú trọng.
        </Typography>
        <Typography variant="body1" paragraph>
          Với đội ngũ nhân viên nhiệt huyết và đam mê với bóng đá, chúng tôi sẵn lòng tư vấn và hỗ trợ bạn chọn lựa
          những đôi giày phù hợp nhất với nhu cầu và phong cách của bạn.
        </Typography>
        <Typography variant="body1" paragraph>
          Hãy đồng hành cùng chúng tôi, và chúng tôi sẽ giúp bạn trang bị những chiếc giày tốt nhất để bạn có thể
          tỏa sáng trên sân cỏ.
        </Typography>
        <Grid2 container justifyContent="center">
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Liên hệ chúng tôi
          </Button>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default About;
