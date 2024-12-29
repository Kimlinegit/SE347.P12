
import React, {useContext, useEffect, useState} from 'react';
import { Container, Typography, Button, Card, CardActionArea, CardContent, CardMedia, Box, Rating, Grid2, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import bannerImg1 from '../assets/images/FootballShoe_Banner_1.jpg';
import bannerImg2 from '../assets/images/FootballShoe_Banner_2.jpg'
import bannerImg3 from '../assets/images/FootballShoe_Banner_3.jpg'
import { GlobalState } from '../globalState';
import ProductCard from '../components/productCard';

function Home()  {

  const state = useContext(GlobalState);

  const [topSales] = state.productAPI.topSales;

  const topSelling = topSales ? topSales.slice(0, 4) : [];


  const bannerImgs = [
    bannerImg1, bannerImg2, bannerImg3
  ]

  

  const popularBrands = [
    'nike',
    'adidas',
    'puma',
    'mizuno'
  ];

  return (
    <Container style={{padding: 30, marginTop: 50}}>
      <Paper sx={{ my: 6, p: 4, borderRadius: 2, boxShadow: 4}}>
        <Typography variant="h3" component="h1" align="center" sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          {/* Welcome to Football Store */}
          Chào mừng đến với Football Store
        </Typography>

        <Typography variant="h5" align="center" sx={{ marginBottom: 4, color: 'text.secondary' }}>
          {/* Explore the latest football boots collection */}
          Khám phá bộ sưu tập giày bóng đá mới nhất
        </Typography>

        <Carousel autoPlay={true} animation="slide" cycleNavigation={true} navButtonsAlwaysVisible={true}>
          {bannerImgs.map((img, index) => (
            <Card key={index}>
              <CardActionArea style={{height: '400px', objectFit: 'cover'}}>
                <CardMedia
                  component="img"
                  height="100%"
                  style={{objectFit: 'cover'}}
                  image={img}
                />
              </CardActionArea>
            </Card>
          ))}
        </Carousel>
        
        {/* Top Selling Products */}
        <Typography variant="h4" align="center" sx={{ marginTop: 4, marginBottom: 2 }}>
          Top 4 bán chạy
        </Typography>

        <Grid2 container spacing={4} justifyContent="center">
          {topSelling.map((product) => (
            <Grid2 key={product._id} item="true" xs={12} sm={6} md={4}>
              <ProductCard product={product}/>
            </Grid2>
          ))}
        </Grid2>

        {/* Popular Brands */}
        <Typography variant="h4" align="center" sx={{ marginTop: 4, marginBottom: 2 }}>
          Danh mục phổ biến
        </Typography>

        <Grid2 container spacing={2} justifyContent="center">
          {popularBrands.map((brand) => (
            <Grid2 key={brand}>
              <Button variant="outlined" component={Link} to={`/products?category=${brand}`}>
                {brand}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Home;

