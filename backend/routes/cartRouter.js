import express from "express";
import { 
    addProductToCart, 
    deleteProductFromCart, 
    getCartItems,
    updateCartItemQuantity
} from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";

const CartRouter = express.Router();


CartRouter.post("/:productId", auth, addProductToCart);
CartRouter.delete("/:productId", auth, deleteProductFromCart);
CartRouter.put("/:productId", auth, updateCartItemQuantity);
CartRouter.get("/items", auth, getCartItems);

export default CartRouter;
