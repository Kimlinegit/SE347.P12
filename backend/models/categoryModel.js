import mongoose from "mongoose";


const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    }
}, {
    timestamsp: true
});

// Middleware chuyển đổi tên thành chữ thường trước khi lưu
CategorySchema.pre('save', function (next) {
    this.name = this.name.toLowerCase();
    next();
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;