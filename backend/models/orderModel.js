

import mongoose from "mongoose";


const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart: [
        {
            type: Object
        }
    ],
    shippingAddress: {
        type: Object
    },
    cartPrice: {
        type: Number
    },
    shippingCost: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "creditcard"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;