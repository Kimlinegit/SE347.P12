


// recreate the stripe object on every render with publishable API key
// const stripePromise = loadStripe("pk_test_51MqHwRHnWtC5zdSFoamUdTdfJEPOJvSzFc30PTqI4knfRfg1p2LSFRthUOLnFGTrr6OcaK0l9n0TiEA1mfSislVA00u5wFgCTM");
// PaymentStrategy
class PaymentStrategy {
  processPayment(totalAmount) {
    throw new Error('processPayment method must be implemented by concrete strategies');
  }
}


// ConcreteStrategy

class CashPaymentStrategy extends PaymentStrategy {
  processPayment(totalAmount) {
    return `Đặt hàng thành công, Vui lòng thanh toán sau khi nhận hàng với số tiền $${totalAmount}!`;
  }
}


class CreditCardPaymentStrategy extends PaymentStrategy {
  async processPayment(totalAmount) {
    // Simulate creating a paymentIntent for a credit card payment
    const paymentIntent = await this.createPaymentIntent(totalAmount);
    // Process the paymentIntent and return a success message
    const paymentResult = this.processPaymentIntent(paymentIntent);
    return paymentResult;
  }
  async createPaymentIntent(totalAmount) {
    // Simulate creating a paymentIntent using an API call or other logic
    // Replace this with your actual API call to create a paymentIntent
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount }),
    });

    const data = await response.json();
    return data.paymentIntent;
  }

  processPaymentIntent(paymentIntent) {
    // Simulate processing the paymentIntent
    // Replace this with your actual logic to handle the paymentIntent
    if (paymentIntent.status === 'succeeded') {
      return 'Thanh toán thành công!';
    } else {
      return 'Thanh toán không thành công. Vui lòng thử lại hoặc chọn phương thức khác!';
    }
  }
}


// create Context
class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setPaymentStrategy(strategy) {
    this.strategy = strategy;
  }

  processPayment(totalAmount) {
    return this.strategy.processPayment(totalAmount);
  }
}


export {
    PaymentContext,
    PaymentStrategy,
    CashPaymentStrategy,
    CreditCardPaymentStrategy
}