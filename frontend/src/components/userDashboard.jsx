

// import React, { useState, useContext } from 'react';
// import { Container, Grid2, Paper, Tabs, Tab } from '@mui/material';
// import OrderHistory from './orderHistory.jsx';
// import UserOrderHistory from './userOrderHistory.jsx';

// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState(0);


//   const handleChangeTab = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Container style={{padding: 30, marginTop: 50}}>
//       <Grid2 container spacing={3}>
//         <Grid2 item="true" xs={3} >
//           <Paper elevation={3} sx={{ padding: 3 }} style={{ minHeight: '70vh', margin: '10px 0'}}>
//             <Tabs
//               orientation="vertical"
//               variant="scrollable"
//               value={activeTab}
//               onChange={handleChangeTab}
//             >
//               <Tab label="Lịch sử đơn hàng" />
//               {/* <Tab label="Thống kê" /> */}
//             </Tabs>
//           </Paper>
//         </Grid2>
//         <Grid2 item="true" xs={9}>
//           <Paper elevation={3} sx={{ padding: 3 }} style={{ width: '150vh', height: '70vh', margin: '10px 0'}}>
//             {activeTab === 0 && <UserOrderHistory/>}
//             {/* {activeTab === 1 && <h1>Statistic</h1>} */}
//           </Paper>
//         </Grid2>
//       </Grid2>
//     </Container>
//   );
// };

// export default UserDashboard;



import React, { useState } from 'react';
import { Container, Box, Paper, Tabs, Tab } from '@mui/material';
import UserOrderHistory from './userOrderHistory.jsx';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

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
          minHeight: '70vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: '1 0 10%', // Chiếm 25% chiều rộng
            padding: 2,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            onChange={handleChangeTab}
          >
            <Tab label="Lịch sử đơn hàng" />
            {/* <Tab label="Thống kê" /> */}
          </Tabs>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: '1 0 75%', // Chiếm 75% chiều rộng
            padding: 2,
          }}
        >
          {activeTab === 0 && <UserOrderHistory />}
          {/* {activeTab === 1 && <h1>Statistic</h1>} */}
        </Paper>
      </Box>
    </Container>
  );
};

export default UserDashboard;
