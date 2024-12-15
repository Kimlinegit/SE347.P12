import express from "express";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
import {
    register,
    login,
    logout,
    getUserProfile,
    refreshToken,
    updateUserProfile,
    changePassword,
    getAllUsers,
    adminUpdateRoles,
    deleteUser
} from "../controllers/userController.js";


const UserRouter = express.Router();


UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/logout', logout);
UserRouter.get('/profile', auth, getUserProfile);
UserRouter.put('/update_profile', auth, updateUserProfile);
UserRouter.put('/:userId', auth, authAdmin, adminUpdateRoles);
UserRouter.put('/change_password', auth, changePassword);
UserRouter.get('/refresh_token', refreshToken);
UserRouter.get('/getAll',auth, authAdmin, getAllUsers);
UserRouter.delete('/:userId', auth, authAdmin, deleteUser);

export default UserRouter;