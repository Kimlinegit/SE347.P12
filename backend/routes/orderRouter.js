import express from "express";
import {
    createOrders,
    cancelOrders,
    detailOrders,
    getAllOrders,
    updateOrderStatus,
    orderStatistics,
    getUserOrderHistory,
    userDeleteOrders,
    adminDeleteOrders
} from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";


const OrderRouter = express.Router();

OrderRouter.post("/create", auth, createOrders);
OrderRouter.get("/history", auth, getUserOrderHistory);

OrderRouter.get("/:orderId", auth, detailOrders);
OrderRouter.put("/:orderId", auth, authAdmin, updateOrderStatus);
OrderRouter.delete("/admin/:orderId", auth, adminDeleteOrders);
OrderRouter.delete("/user/:orderId", auth, userDeleteOrders);
OrderRouter.put("/cancel/:orderId", auth, cancelOrders);
OrderRouter.get("/", auth, authAdmin, getAllOrders);
OrderRouter.get("/statistics", auth, authAdmin, orderStatistics);

export default OrderRouter;