
import mongoose from "mongoose";



const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: [
        {
            size: {
                type: String
            },
            quantity: {
                type: Number
            }
        }
    ],
    inStock: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        default: 0
    },
    images: [
        {
            type: Object
        }
    ],
    avgRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
            }
        }
    ],
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

ProductSchema.pre(['save', 'findOneAndUpdate'], async function (next) {
    // Tính tổng quantity từ mảng sizes
    const totalQuantity = this.sizes.reduce((total, current) => total + current.quantity, 0);
  
    // Gán giá trị của inStock bằng tổng quantity
    this.inStock = totalQuantity;

    // Kiểm tra nếu có reviews và numReviews > 0, thì mới tính avgRating
    if (this.reviews && this.numReviews > 0) {
        const totalRating = this.reviews.reduce((total, r) => total + r.rating, 0);
        this.avgRating = totalRating / this.numReviews;
    } else {
        // Nếu không có reviews hoặc numReviews === 0, đặt avgRating về 0 hoặc giá trị mặc định mong muốn
        this.avgRating = 0; // hoặc giá trị mặc định khác nếu có
    }
  
    // Tiếp tục với quá trình lưu dữ liệu
    next();
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;