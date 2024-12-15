import express from "express";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
import { getMonthlyUserRegistrations, getMonthlyOrderRegistrations } from "../controllers/statisticAdminController.js";


const StatisticRouter = express.Router();

StatisticRouter.get('/user',auth, authAdmin, getMonthlyUserRegistrations);
StatisticRouter.get('/order',auth, authAdmin, getMonthlyOrderRegistrations);

export default StatisticRouter;