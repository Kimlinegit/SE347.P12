
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Tạo một promise cho Stripe
const stripePromise = loadStripe("pk_test_51MqHwRHnWtC5zdSFoamUdTdfJEPOJvSzFc30PTqI4knfRfg1p2LSFRthUOLnFGTrr6OcaK0l9n0TiEA1mfSislVA00u5wFgCTM");

const createPaymentIntent = async (totalPrice) => {
  try {
    const response = await axios.post("/create-payment-intent", {
      totalPrice,
    });

    return response.data.clientSecret;
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    throw error;
  }
};



export {
    stripePromise,
    createPaymentIntent
}
