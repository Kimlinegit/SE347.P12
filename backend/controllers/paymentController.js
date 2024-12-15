// import Stripe from 'stripe';


// const stripeSecretKey = 'sk_test_51MqHwRHnWtC5zdSFoEoibUS8SuxlzFT1zX9bjsWgcScyHqsHEU7z6SL0RiDcWFkAW5iU6sasBESUREETC7YCxxwh00Nq33GKLf';
// const stripe = Stripe(stripeSecretKey);

// const createPaymentIntent = async (req, res) => {
//     try {
//         const {totalPrice} = req.body;
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: totalPrice,
//             currency: "usd",
//             statement_descriptor_suffix: "Payment using Stripe",
//             automatic_payment_methods: {
//                 enabled: true
//             }
//         });
//         res.send({clientSecret: paymentIntent.client_secret});
//     } catch (error) {
//         console.error("Error creating paymentItent:", error.message);
//         res.status(500).send({error: error.message});
//     }
// };



// const paymentSuccess = async (req, res) => {
// res.send("Payment successful! thank you for your purchase.");
// };


// const paymentCancel = async (req, res) => {
//     res.send("Payment canceled! your order was not processed.");
// };


// export {
//     createPaymentIntent,
//     paymentSuccess,
//     paymentCancel
// }


import Stripe from 'stripe';


const stripeSecretKey = 'sk_test_51MqHwRHnWtC5zdSFoEoibUS8SuxlzFT1zX9bjsWgcScyHqsHEU7z6SL0RiDcWFkAW5iU6sasBESUREETC7YCxxwh00Nq33GKLf';
const stripe = Stripe(stripeSecretKey);
const MY_DOMAIN = 'http://localhost:5173';


const createCheckoutSession = async (req, res) => {
  const { cartItems } = req.body; // Nhận danh sách sản phẩm từ frontend
  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd', // Đơn vị tiền tệ
      product_data: {
        name: item.name, // Tên sản phẩm
        description: item.description, // Mô tả sản phẩm (nếu có)
      },
      unit_amount: item.price * 100, // Giá tiền (Stripe sử dụng đơn vị cent)
    },
    quantity: item.quantity, // Số lượng
  }));
  const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${MY_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  
  res.send({clientSecret: session.client_secret});
}


const getSessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        customer_email: session.customer_details.email
    });
}

export {
    createCheckoutSession,
    getSessionStatus
}

