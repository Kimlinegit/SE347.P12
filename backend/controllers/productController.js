import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import { response } from "express";

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const getAllProducts = async (req, res) =>{
    try {
        const features = new APIfeatures(Product.find()
            .populate('category') // Populate the 'category' field
                .populate({
                    path: 'reviews',   // Populate the 'reviews' field
                    model: 'Review',   // Specify the model to use for population
                    populate: {
                        path: 'user',   // Populate the 'user' field within the 'reviews' array
                        model: 'User'   // Specify the model to use for population
                    }
                }), 
                req.query
            )
            .filtering()
            .sorting()
            .paginating()

        const products = await features.query

        res.json({
            status: 'success',
            result: products.length,
            products: products
        })
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
};


const detailProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            // Nếu sản phẩm không tồn tại, trả về mã trạng thái 404
            // return res.status(404).json({ message: "Product not found" });
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        await product.populate('category');

        res.json(product);
    } catch (error) {
        console.error(error); // Log lỗi để dễ theo dõi
        res.status(500).json({ message: error.message });
    }
};



const createProduct = async (req, res) => {
    try {
        const {name, description, category, price, sizes, images} = req.body;

        const lowerCaseName = name.toLowerCase();

        // Tạo một instance mới của Product
        const newProduct = new Product({
            name: lowerCaseName,
            description,
            category,
            price,
            sizes,
            images,
        })

        // Lưu sản phẩm mới tạo
        const savedProduct = await newProduct.save();

        // Trả về sản phẩm mới được tạo
        // res.status(201).json({messge: "The product was created successfully!", savedProduct});
        res.status(201).json({message: "Thêm mới sản phẩm thành công!", savedProduct});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId; // Lấy id của sản phẩm từ URL
        const {name, description, category, price, images, sizes} = req.body;

        // Kiểm tra sản phẩm có tồn tại không?
        const existingProduct = await Product.findById(productId);
        if(!existingProduct) {
            // return res.status(404).json({message: `Product not found!`})
            return res.status(404).json({message: `Không tìm thấy sản phẩm!`})
        }
        
        // Cập nhật thông tin mới cho sản phẩm
        existingProduct.name = name || existingProduct.name;
        existingProduct.description = description || existingProduct.description;
        existingProduct.category = category || existingProduct.category;
        existingProduct.price = price || existingProduct.price;
        existingProduct.images = images || existingProduct.images;
        existingProduct.sizes = sizes || existingProduct.sizes;

        // Lưu thông tin mới cập nhật cho sản phẩm
        const updatedProduct = await existingProduct.save();

        // Trả về thông tin sản phẩm mới cập nhật
        // res.status(200).json({message: "The product was updated successfully!",updatedProduct});
        res.status(200).json({message: "Cập nhật thông tin sản phẩm thành công!",updatedProduct});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const existingProduct = await Product.findById(productId);
        if(existingProduct) {
            await Product.findByIdAndDelete(productId);
            // res.status(200).json({message: `Product deleted successfully!`});
            res.status(200).json({message: `Xóa sản phẩm thành công!`});
        } else {
            // res.status(404).json({message: `Product not found!`});
            res.status(404).json({message: `Không tìm thấy sản phẩm!`});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


const createProductReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;
        const { rating, comment } = req.body;

        // Kiểm tra người dùng đã đăng nhập chưa
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Hãy đăng nhập để đánh giá sản phẩm" });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        // Tìm tất cả đơn hàng của người dùng
        const userOrders = await Order.find({ user: userId });

        // Kiểm tra xem người dùng đã mua sản phẩm đó chưa
        const hasPurchased = userOrders.some(order =>
            order.cart.some(item => item.product.toString() === productId)
        );

        if (!hasPurchased) {
            // return res.status(403).json({ message: "You can only review products you have purchased" });
            return res.status(403).json({ message: "Chỉ được phép đánh giá khi đã mua sản phẩm!" });
        }

        // Tìm xem người dùng đã đánh giá sản phẩm chưa
        const existingReviewIndex = product.reviews.findIndex(
            (review) => review.user.toString() === userId
        );

        if (existingReviewIndex !== -1) {
            // Nếu người dùng đã đánh giá, cập nhật lại đánh giá
            product.reviews[existingReviewIndex].rating = rating;
            product.reviews[existingReviewIndex].comment = comment;
        } else {
            // Nếu người dùng chưa đánh giá, thêm mới đánh giá
            const newReview = {
                user: userId,
                rating,
                comment,
            };
            product.reviews.push(newReview);
        }

        // Cập nhật số lượng đánh giá
        product.numReviews = product.reviews.length;

        // Lưu các thay đổi vào sản phẩm và review
        await product.save();

        res.status(201).json({ message: "Thực hiện đánh giá sản phẩm thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const {rating, comment} = req.body;

        const product = await Product.findById(productId).populate({
            path: 'reviews',   // Populate the 'reviews' field
            model: 'Review',   // Specify the model to use for population
            populate: {
                path: 'user',   // Populate the 'user' field within the 'reviews' array
                model: 'User'   // Specify the model to use for population
            }
        })

        res.status(200).json(product.reviews);

        const existingReview = product.reviews.map((review) => {
            review.user._id.toString() === productId
        })

        res.status(200).json(existingReview);

        if(!existingReview) {
            return res.status(404).json({ message: "Người dùng chưa đánh giá sản phẩm này!" });
        }
        
        existingReview.rating = rating;
        existingReview.comment = comment;
        const updatedReview = await existingReview.save();

        res.status(200).json({ message: "Cập nhật đánh giá thành công!", updatedReview});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingReview = await Review.findOne({user: userId});
        if(!existingReview) {
            return res.status(404).json({ message: "Không tìm thấy đánh giá của người dùng!" });
        }
         const reviews = Review.findByIdAndDelete(existingReview._id);
         res.status(200).json({message: `Đã xóa đánh giá thành công!`, reviews});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const productStatistics = async (req, res) => {
  try {
    // Số lượng sản phẩm
    const totalProducts = await Product.countDocuments();

    // Doanh số bán hàng
    const totalSales = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$sold" }
        }
      }
    ]);

    // Số lượng sản phẩm bán chạy
    const bestSellingProducts = await Product.find().sort({ sold: -1 }).limit(5);

    // Số lượng sản phẩm tồn kho
    const totalStock = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$inStock" }
        }
      }
    ]);

    // Đánh giá và đánh giá trung bình
    const productReviews = await Product.aggregate([
      {
        $project: {
          name: 1,
          numReviews: { $size: "$reviews" },
          avgRating: { $avg: "$reviews.rating" }
        }
      }
    ]);

    // Số lượng danh mục và thương hiệu
    const totalCategories = await Product.distinct("category");
    // const totalBrands = await Product.distinct("brand");

    res.status(200).json({
      totalProducts,
      totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
      bestSellingProducts,
      totalStock: totalStock.length > 0 ? totalStock[0].total : 0,
      productReviews,
      totalCategories: totalCategories.length,
    //   totalBrands: totalBrands.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
    getAllProducts,
    detailProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    updateReview,
    deleteReview,
    productStatistics
};

