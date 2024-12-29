

// import React, { useState, useContext } from 'react';
// import { Container, Grid2, Paper, Tabs, Tab } from '@mui/material';
// import ProductManagement from './productManagement.jsx';
// import CategoryManagement from './categoryManagement.jsx';
// import OrderManagement from './orderManagement.jsx';
// import UserManagement from './userManagement.jsx';
// import Statistic from './statisticManagement.jsx';
// import { GlobalState } from '../globalState.jsx';

// const Dashboard = ({users, orders}) => {
//   const [activeTab, setActiveTab] = useState(0);

//   const state = useContext(GlobalState);
//   const [products] = state.productAPI.products;
//   const [categories] = state.categoryAPI.categories;

//   const handleChangeTab = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Container>
//       <Grid2 container spacing={3}>
//         <Grid2 item="true" xs={3} >
//           <Paper elevation={3} sx={{ padding: 3 }} style={{ minHeight: '70vh', margin: '10px 0'}}>
//             <Tabs
//               orientation="vertical"
//               variant="scrollable"
//               value={activeTab}
//               onChange={handleChangeTab}
//             >
//               <Tab label="Người dùng" />
//               <Tab label="Đơn hàng" />
//               <Tab label="Sản phẩm" />
//               <Tab label="Danh mục" />
//               <Tab label="Thống kê" />
//             </Tabs>
//           </Paper>
//         </Grid2>
//         <Grid2 item="true" xs={9}>
//           <Paper elevation={3} sx={{ padding: 3 }} style={{ width: '150vh', height: '70vh', margin: '10px 0'}}>
//             {activeTab === 0 && <UserManagement users = {users} />}
//             {activeTab === 1 && <OrderManagement products = {products} orders = {orders}/>}
//             {activeTab === 2 && <ProductManagement products = {products} categories = {categories}/>}
//             {activeTab === 3 && <CategoryManagement categories = {categories}/>}
//             {activeTab === 4 && <Statistic products = {products} categories = {categories} orders = {orders}/>}
//           </Paper>
//         </Grid2>
//       </Grid2>
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useState, useContext } from 'react';
import { Container, Box, Paper, Tabs, Tab } from '@mui/material';
import ProductManagement from './productManagement.jsx';
import CategoryManagement from './categoryManagement.jsx';
import OrderManagement from './orderManagement.jsx';
import UserManagement from './userManagement.jsx';
import Statistic from './statisticManagement.jsx';
import { GlobalState } from '../globalState.jsx';

const Dashboard = ({ users, orders }) => {
  const [activeTab, setActiveTab] = useState(0);

  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [categories] = state.categoryAPI.categories;

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container style={{ padding: 70, marginTop: 50 }}>
      <Box
        display="flex"
        gap={3}
        sx={{
          flexDirection: { xs: 'column', md: 'row' }, // Hàng ngang trên màn lớn, hàng dọc trên màn nhỏ
          minHeight: '70vh'
        }}
      >
        {/* Sidebar Tabs */}
        <Paper
          elevation={3}
          sx={{
            flex: '1 0 10%',
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            onChange={handleChangeTab}
          >
            <Tab label="Người dùng" />
            <Tab label="Đơn hàng" />
            <Tab label="Sản phẩm" />
            <Tab label="Danh mục" />
            <Tab label="Thống kê" />
          </Tabs>
        </Paper>

        {/* Content Section */}
        <Paper
          elevation={3}
          sx={{
            flex: '1 0 75%',
            padding: 3,
          }}
        >
          {activeTab === 0 && <UserManagement users={users} />}
          {activeTab === 1 && <OrderManagement products={products} orders={orders} />}
          {activeTab === 2 && <ProductManagement products={products} categories={categories} />}
          {activeTab === 3 && <CategoryManagement categories={categories} />}
          {activeTab === 4 && <Statistic products={products} categories={categories} orders={orders} />}
        </Paper>  
      </Box>
    </Container>
  );
};

export default Dashboard;


