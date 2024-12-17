// import React, {useState, useContext} from 'react';
// import { Grid2, Paper, Typography, Card, CardContent, Container } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
// import { GlobalState } from '../globalState';


// const generateRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };

// // const listCorlors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff']


// const Statistic = () => {
//     const state = useContext(GlobalState);
//     const [orders] = state.orderAPI.orders;
//     const [categories] = state.categoryAPI.categories;
//     const [products] = state.productAPI.products;
//     const [users] = state.userAPI.users;
//     const [userStatistic] = state.statisticAPI.userStatistic;
//     const [orderStatistic] = state.statisticAPI.orderStatistic;
//     const [countOrders, setCountOrders] = useState(orders?.length||0);
//     const [countCategories, setCountCategories] = useState(categories?.length||0);
//     const [countProducts, setCountProducts] = useState(products?.length||0);
//     const [countUsers, setCountUsers] = useState(users?.length||0);

//     // console.log(userStatistic)
//     console.log(orderStatistic);



//   const productData = [
//     { category: 'nike', products: 2 },
//     { category: 'puma', products: 1 },
//     { category: 'adidas', products: 1 },
//     { category: 'mizuno', products: 1 },
//     // ...Thêm dữ liệu cho các danh mục khác
//   ];

//   const categoryData = [
//     { id: 1, name: 'puma' },
//     { id: 2, name: 'adidas' },
//     { id: 3, name: 'nike' },
//     { id: 4, name: 'mizuno' },
//     // ...Thêm danh mục khác nếu cần
//   ].map(category => ({ ...category, color: generateRandomColor() }));


//   return (
//     <Container>
//       <Typography variant="h5" gutterBottom>
//         Thống kê
//       </Typography>

//       <Paper style={{ overflow: 'auto', maxHeight: '40vh', padding: '10px' }}>
//         <Grid2 container spacing={2}>
//             {/* User Statistics */}
//             <Grid2 item="true" xs={12} md={6} lg={3}>
//             <Card>
//                 <CardContent style={{padding: '5px', paddingBottom: "0"}}>
//                 <Typography variant="h7" component="div">
//                     Người dùng
//                 </Typography>
//                 <Typography variant="h5">
//                     {users.length}
//                 </Typography>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Product Statistics */}
//             <Grid2 item="true" xs={12} md={6} lg={3}>
//             <Card>
//                 <CardContent style={{padding: '5px', paddingBottom: "0"}}>
//                 <Typography variant="h7" component="div">
//                     Sản phẩm
//                 </Typography>
//                 <Typography variant="h5">
//                     {countProducts}
//                 </Typography>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Category Statistics */}
//             <Grid2 item="true" xs={12} md={6} lg={3}>
//             <Card>
//                 <CardContent style={{padding: '5px', paddingBottom: "0"}}>
//                 <Typography variant="h7" component="div">
//                     Danh mục
//                 </Typography>
//                 <Typography variant="h5">
//                     {countCategories}
//                 </Typography>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Order Statistics */}
//             <Grid2 item="true" xs={12} md={6} lg={3}>
//             <Card>
//                 <CardContent style={{padding: '5px', paddingBottom: "0"}}>
//                 <Typography variant="h7" component="div">
//                     Đơn hàng
//                 </Typography>
//                 <Typography variant="h5">
//                     {countOrders}
//                 </Typography>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Bar Chart for User Data */}
//             <Grid2 item="true" xs={12} md={12} lg={6}>
//             <Card>
//                 <CardContent>
//                 <Typography variant="h6" component="div">
//                     Biểu đồ người dùng
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={userStatistic}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" />
//                     </BarChart>
//                 </ResponsiveContainer>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Bar Chart for Product Data */}
//             <Grid2 item="true" xs={12} md={12} lg={6}>
//             <Card>
//                 <CardContent>
//                 <Typography variant="h6" component="div">
//                     Biểu đồ sản phẩm
//                 </Typography>
//                 <ResponsiveContainer width="50%" height={200}>
//                     <BarChart data={productData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="category" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="products" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Bar Chart for Category Data */}
//             <Grid2 item="true" xs={12} md={12} lg={6}>
//             <Card>
//                 <CardContent>
//                     <Typography variant="h6" component="div">
//                         Category Distribution
//                     </Typography>
//                     <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                             <Pie
//                                 dataKey="id"
//                                 isAnimationActive={false}
//                                 data={categoryData}
//                                 cx="50%"
//                                 cy="50%"
//                                 outerRadius={80}
//                                 label
//                             >
//                                 {categoryData.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={entry.color} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </CardContent>
//             </Card>
//             </Grid2>

//             {/* Bar Chart for Order Data */}
//             <Grid2 item="true" xs={12} md={12} lg={6}>
//             <Card>
//                 <CardContent>
//                 <Typography variant="h6" component="div">
//                     Order Growth
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={orderStatistic}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#5da4d9" />
//                     </BarChart>
//                 </ResponsiveContainer>
//                 </CardContent>
//             </Card>
//             </Grid2>
//         </Grid2>
//       </Paper>
//     </Container>
//   );
// };

// export default Statistic;



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


