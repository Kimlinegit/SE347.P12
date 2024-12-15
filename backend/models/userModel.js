import mongoose from "mongoose";
import ImageSchema from "./imageSchema.js";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            default: ""
        },
        district: {
            type: String,
            default: ""
        },
        ward: {
            type: String,
            default: ""
        },
        street: {
            type: String,
            default: ""
        }
    },
    avatar: {
        type: Object
    },
    role: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

export default User;