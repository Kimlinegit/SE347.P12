

import React, { useState, useContext } from 'react';
import { Container, Grid2, Paper, Tabs, Tab } from '@mui/material';
import OrderHistory from './orderHistory.jsx';
import UserOrderHistory from './userOrderHistory.jsx';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);


  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Grid2 container spacing={3}>
        <Grid2 item="true" xs={3} >
          <Paper elevation={3} sx={{ padding: 3 }} style={{ minHeight: '70vh', margin: '10px 0'}}>
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
        </Grid2>
        <Grid2 item="true" xs={9}>
          <Paper elevation={3} sx={{ padding: 3 }} style={{ width: '150vh', height: '70vh', margin: '10px 0'}}>
            {activeTab === 0 && <UserOrderHistory/>}
            {/* {activeTab === 1 && <h1>Statistic</h1>} */}
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default UserDashboard;


