
import React, { useContext } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Container,
  Divider,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from 'recharts';
import { GlobalState } from '../globalState';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Statistic = () => {
  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;
  const [categories] = state.categoryAPI.categories;
  const [products] = state.productAPI.products;
  const [users] = state.userAPI.users;
  const [userStatistic] = state.statisticAPI.userStatistic;
  const [orderStatistic] = state.statisticAPI.orderStatistic;

  const productData = [
    { category: 'Nike', products: 2 },
    { category: 'Puma', products: 1 },
    { category: 'Adidas', products: 1 },
    { category: 'Mizuno', products: 1 },
  ];

  console.log(categories);

  const categoryData = [
    { id: 1, name: 'Puma' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'Nike' },
    { id: 4, name: 'Mizuno' },
  ].map((category) => ({ ...category, color: generateRandomColor() }));

  return (
    <div>
        <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            Thống kê tổng quan
        </Typography>
        <Container component={Paper} style={{ marginTop: '20px', height: '52vh', overflowY: 'auto'}}>
      
            <Grid container spacing={1} style={{margin: '10px'}}>
                {/* Compact statistics cards */}
                <Grid container item spacing={1} justifyContent="center">
                    {[
                    { label: 'Người dùng', value: users.length, color: '#1976d2' },
                    { label: 'Sản phẩm', value: products.length, color: '#388e3c' },
                    { label: 'Danh mục', value: categories.length, color: '#ff5722' },
                    { label: 'Đơn hàng', value: orders.length, color: '#ff9800' },
                    ].map((stat, index) => (
                    <Grid item xs={6} sm={3} md={2} key={index}>
                        <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 1, borderRadius: 1, padding: 0.5 }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="textSecondary" align="center">
                            {stat.label}
                            </Typography>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: stat.color }}>
                            {stat.value}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>

                {/* Charts - reduced height and arranged compactly */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 1, borderRadius: 1, mt: 1 }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>
                        Biểu đồ người dùng
                        </Typography>
                        <Divider />
                        <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={userStatistic}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#3f51b5" />
                        </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 1, borderRadius: 1, mt: 1 }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>
                        Biểu đồ sản phẩm
                        </Typography>
                        <Divider />
                        <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="products" fill="#4caf50" />
                        </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 1, borderRadius: 1, mt: 1 }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>
                        Tỷ lệ các danh mục
                        </Typography>
                        <Divider />
                        <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie dataKey="id" data={categoryData} cx="50%" cy="50%" outerRadius={60} label>
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 1, borderRadius: 1, mt: 1 }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>
                        Tăng trưởng đơn hàng
                        </Typography>
                        <Divider />
                        <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={orderStatistic}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#ff7043" />
                        </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </div>
  );
};

export default Statistic;


