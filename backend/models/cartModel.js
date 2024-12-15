import mongoose from "mongoose";


const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items:[{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart