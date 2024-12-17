

// import React, { useState, useEffect} from 'react';
// import {
//   Grid,
//   Typography,
//   Button,
//   CircularProgress,
//   Paper,
// } from '@material-ui/core';
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';




// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();


//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing!");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//       }
//     });
//   }, [stripe]);



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }
//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {

//       },
//     });

//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     // Thanh toán thành công
//     setMessage("Payment succeeded!");

//     alert(`Tạo đơn hàng thành công`);

//     setIsLoading(false);
//   };

//   // const handleEmailChange = (event) => {
//   //   const newValue = event?.target?.value;
//   // };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
//       <Grid item xs={12} sm={8} md={6}>
//         <Paper elevation={3} style={{ padding: '20px' }}>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3} direction="column">
//               <Grid item>
//                 <Typography variant="h4">Checkout</Typography>
//               </Grid>
//               <Grid item>
//                 <LinkAuthenticationElement
//                   // onChange={handleEmailChange}
//                 />
//               </Grid>
//               <Grid item>
//                 <PaymentElement options={paymentElementOptions} />
//               </Grid>
//               <Grid item>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isLoading || !stripe || !elements}
//                 >
//                   {isLoading ? <CircularProgress size={24} /> : "Pay now"}
//                 </Button>
//               </Grid>
//               {message && (
//                 <Grid item>
//                   <Typography color="error">{message}</Typography>
//                 </Grid>
//               )}
//             </Grid>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default CheckoutForm;




// import React, { useState, useEffect } from "react";


// const ProductDisplay = () => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/create-checkout-session" method="POST">
//       <button type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function CheckoutForm() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay />
//   );
// }






import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

const stripePromise = loadStripe("pk_test_51MqHwRHnWtC5zdSFoamUdTdfJEPOJvSzFc30PTqI4knfRfg1p2LSFRthUOLnFGTrr6OcaK0l9n0TiEA1mfSislVA00u5wFgCTM");

const CheckoutForm = ({ cart }) => {
  const fetchClientSecret = useCallback(() => {
    // Gửi thông tin giỏ hàng đến backend
    return fetch("/api/payment/create-checkout-session", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems: cart }), // Gửi danh sách sản phẩm
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [cart]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};


const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/payment/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

export {
  CheckoutForm,
  Return
}


