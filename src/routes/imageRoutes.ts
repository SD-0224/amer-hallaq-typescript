import express from "express"
import { uploadImage, showHome,showImageProcessing,resizeImage,cropImage,addWatermark,downloadImage,applyFilter } from '../controllers/imageController';
import upload from "../middleware/upload"

const router=express.Router();

router.get('/',showHome);
router.post('/upload',upload.single('image'),uploadImage);
router.get('/process/:image',showImageProcessing);
router.get('/resize/:image',resizeImage);
router.get('/crop/:image',cropImage);
router.get('/watermark/:image',addWatermark);
router.get('/download/:image',downloadImage);
router.get('/filter/:image',applyFilter);

export default router;