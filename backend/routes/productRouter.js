import express from "express";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
import { 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getAllProducts,
    detailProduct,
    createProductReview,
    updateReview,
    deleteReview,
    productStatistics
} from "../controllers/productController.js";


const ProductRouter = express.Router();

ProductRouter.post("/create", auth, authAdmin, createProduct);
ProductRouter.put("/:productId", auth, authAdmin, updateProduct);
ProductRouter.delete("/:productId", auth, authAdmin, deleteProduct);
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/statistics", auth, authAdmin, productStatistics);
ProductRouter.get("/:productId", detailProduct);
ProductRouter.post("/review/:productId", auth, createProductReview);
ProductRouter.put("/review/:productId", auth, updateReview);
ProductRouter.delete("/review/:productId", auth, deleteReview);

export default ProductRouter;