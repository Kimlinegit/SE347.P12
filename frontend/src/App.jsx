
import React, {useState, useEffect, useContext} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Pages from './pages/page.jsx';
import {loadStripe} from '@stripe/stripe-js';
import { DataProvider } from './globalState.jsx';



const stripePromise = loadStripe("pk_test_51MqHwRHnWtC5zdSFoamUdTdfJEPOJvSzFc30PTqI4knfRfg1p2LSFRthUOLnFGTrr6OcaK0l9n0TiEA1mfSislVA00u5wFgCTM");



const App = () => {

  return (
    <DataProvider>
      <Elements stripe={stripePromise}>
        <Pages/>
      </Elements>
    </DataProvider>
  );
}

export default App









