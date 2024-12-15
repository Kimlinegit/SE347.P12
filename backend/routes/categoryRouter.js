import express from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";


const categoryRouter = express.Router();

categoryRouter.get("/",getAllCategories);
categoryRouter.post("/create", auth, authAdmin, createCategory);
categoryRouter.put("/:categoryId", auth, authAdmin, updateCategory);
categoryRouter.delete("/:categoryId", auth, authAdmin, deleteCategory);

export default categoryRouter;