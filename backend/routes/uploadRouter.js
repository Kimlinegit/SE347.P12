import express from "express";
import {uploadImage, destroyImage} from "../config/cloudinary.js";

const UploadRouter = express.Router();


UploadRouter.post("/upload", uploadImage);
UploadRouter.post("/destroy", destroyImage);


export default UploadRouter;