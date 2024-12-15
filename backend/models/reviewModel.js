import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: "Very good!"
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
