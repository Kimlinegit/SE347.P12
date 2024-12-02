

import express from "express";
// import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import UserRouter from "./routes/userRouter.js";
import UploadRouter from "./routes/uploadRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import ProductRouter from "./routes/productRouter.js";
import CartRouter from "./routes/cartRouter.js";
import OrderRouter from "./routes/orderRouter.js";
import StatisticRouter from "./routes/statisticRouter.js";


import ConnectionManager from "./config/database.js";

import Stripe from 'stripe';

dotenv.config();


const connectionManager = ConnectionManager.getInstance();


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());




app.use(fileUpload({
    useTempFiles: true
}));

// app.use("/api/image", UploadRouter);
// app.use("/api/user", UserRouter);
// app.use("/api/categories", categoryRouter);
// app.use("/api/products", ProductRouter);
// app.use("/api/cart", CartRouter);
// app.use("/api/order", OrderRouter);
// app.use("/api/statistic", StatisticRouter);



const stripeSecretKey = 'sk_test_51MqHwRHnWtC5zdSFoEoibUS8SuxlzFT1zX9bjsWgcScyHqsHEU7z6SL0RiDcWFkAW5iU6sasBESUREETC7YCxxwh00Nq33GKLf';
const stripe = Stripe(stripeSecretKey);



app.post('/create-checkout-session', async (req, res) => {
    const { amount, currency } = req.body; 
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Giỏ hàng của bạn',
            },
            unit_amount: amount, // Số tiền thanh toán tính bằng cents (1 USD = 100 cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/paymentSuccess`,  // URL để chuyển hướng khi thanh toán thành công
      cancel_url: `http://localhost:5173`,    // URL để chuyển hướng khi người dùng hủy thanh toán
    });
  
    res.json({ id: session.id });
  });



connectionManager.connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});