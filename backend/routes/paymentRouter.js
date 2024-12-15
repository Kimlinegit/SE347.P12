// import express from "express";
// import { createPaymentIntent } from "../controllers/paymentController.js";

// const PaymentRouter = express.Router();


// PaymentRouter.post("/create-payment-intent", createPaymentIntent);



// export default PaymentRouter; 


import express from "express";
import { createCheckoutSession, getSessionStatus } from "../controllers/paymentController.js";

const PaymentRouter = express.Router();


PaymentRouter.post("/create-checkout-session", createCheckoutSession);
PaymentRouter.post("/create-checkout-session", getSessionStatus);



export default PaymentRouter; 