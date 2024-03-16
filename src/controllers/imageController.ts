
import { Request, Response } from 'express';
import sharp from 'sharp';
import path from "path";
import { getImagesList, replaceImage, findPaths } from '../utils/imagesHandler';
import {errorHandler} from '../utils/errorHandler'


const  showHome =  async (req:Request,res:Response) => {
    
    const images = await getImagesList(res);
    res.render('index', {images});

    }

const uploadImage = (req:Request,res:Response) => {

    try {
        if(!req.file) {
            throw Error("Please upload an image")
        }
        
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: 'Please upload an image' });
    }    
    
}


const showImageProcessing = (req:Request,res:Response) => {
    console.log(req.params)
    const image= req.params.image
    res.render("image", {image})
}

const resizeImage =async (req:Request,res:Response) => {
    const imageName=req.params.image;
    const [imagePath,processedPath] = findPaths(imageName);
    const {width, height}= req.query;
    if(!imagePath) {
        return res.status(400).json({ error: 'Filename does not exist.' });
    }
    if (!width || !height) {
        return res.status(400).json({ error: 'Width and height are required.' });
    }

    try {

        await sharp(imagePath).resize(Number(width),Number(height), {fit:'cover'})
        .toFile(processedPath)
        replaceImage(processedPath,imagePath)
        res.redirect(`/process/${imageName}`)
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
      }  
}

const cropImage = (req:Request,res:Response) => {
    
    const imageName=req.params.image;
    const [imagePath,processedPath] = findPaths(imageName);
    
    const {left,top,width,height}= req.query;
    if(!imagePath) {
        return res.status(400).json({ error: 'Filename doesn not exist.' });
    }
    
    sharp(imagePath).extract({left:Number(left),top:Number(top),width:Number(width),height:Number(height)})
    .toFile(processedPath)
    .then(data => {
        replaceImage(processedPath,imagePath)
        res.redirect(`/process/${imageName}`)
    })

    .catch(error => {
        errorHandler(error,res);
        
    })
    
}

const downloadImage = (req:Request,res:Response) => {

    const imageName= req.params.image;  
    const imagePath:string=path.join(__dirname,`../uploads/${imageName}`);
    if(!imagePath) {
        return res.status(400).send('Filename is not found');
    }

    res.download(imagePath, (err) => {
        if(err) {
            errorHandler(err,res);
        }
    });
}

const applyFilter =async (req:Request,res:Response) => {

    const blur=req.query.blur;
    const grayscale= req.query.grayscale;
    const imageName=req.params.image;
    const [imagePath,processedPath] = findPaths(imageName);
    try {
        let image=sharp(imagePath)

        if(blur) { 
            image.blur(5)
        }
        if(grayscale) {
            image.grayscale(true)
        }

        await image.toFile(processedPath)
        replaceImage(processedPath,imagePath)
        res.redirect(`/process/${imageName}`)
    }

    catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to apply filter' });
    }

}

const addWatermark = async (req:Request,res:Response) => {
    
    try {

        const {watermark}=req.query
        const imageName=req.params.image;
        const [imagePath,processedPath] = findPaths(imageName);
        let sharpImage = sharp(imagePath);
        const metadata = await sharpImage.metadata();
        const watermarkSize = Math.floor(metadata.width! / 10);
        const textImage=Buffer.from(`<svg><text x="10" y="10" font-family="Arial"
        font-size="${watermarkSize}px" fill="red">${watermark}</text></svg>`)
        await sharpImage.composite([{
        input:textImage ,
        gravity: 'center',
        }])
        .toFile(processedPath)
        replaceImage(processedPath,imagePath)
        res.redirect(`/process/${imageName}`)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred during image processing');
    }
}
 

export { showHome,
        uploadImage,
        showImageProcessing,
        resizeImage,
        cropImage,
        addWatermark,
        downloadImage,
        applyFilter
   }