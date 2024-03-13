import { error } from 'console';
import { Request, Response } from 'express';
import sharp from 'sharp';
import path from "path";
import { getImagesList, replaceImage } from '../utils/imagesHandler';




const showHome =  (req:Request,res:Response) => {
    
    const images = getImagesList();
    res.render('index', {images});

    }

const uploadImage = (req:Request,res:Response) => {

    try {
        if(!req.file) {
            throw Error("Please upload an image")
        }
        
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Please upload an image' });
    }    
    
}


const showImageProcessing = (req:Request,res:Response) => {
    console.log(req.params)
    const image= req.params.image
    res.render("image", {image})
}

const resizeImage = (req:Request,res:Response) => {
    console.log(req.params)
    const imageName= req.params.image
    console.log(imageName)
    const imagePath:string=path.join(__dirname,`../uploads/${imageName}`);
    const processedPath:string=path.join(__dirname,`../processed/${imageName}`);
    const {width, height}= req.query;
    if(!imagePath) {
        return res.status(400).json({ error: 'Filename doesn not exist.' });
    }
    if (!width || !height) {
        return res.status(400).json({ error: 'Width and height are required.' });
    }
    console.log(typeof(width),typeof(height))
    sharp(imagePath).resize(Number(width),Number(height))
    .toFile(processedPath)
    .then(data => {
        replaceImage(processedPath,imagePath)
        res.redirect(`/process/${imageName}`)
    })

    .catch(error => {
        console.error(error)
    })
    
}

const cropImage = (req:Request,res:Response) => {
    
    const imageName= req.params.image
    const imagePath:string=path.join(__dirname,`../uploads/${imageName}`);
    const processedPath:string=path.join(__dirname,`../processed/${imageName}`);
    const {left,top,width,height}= req.query;
    if(!imagePath) {
        return res.status(400).json({ error: 'Filename doesn not exist.' });
    }
    if (!left || !top || !width || !height) {
        return res.status(400).json({ error: 'Width and height are required.' });
    }
    sharp(imagePath).extract({left:Number(left),top:Number(top),width:Number(width),height:Number(height)})
    .toFile(processedPath)
    .then(data => {
        replaceImage(processedPath,imagePath)
        res.redirect(`/process/${imageName}`)
    })

    .catch(error => {
        console.log("error")
        res.send({message:error})
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
            console.log(err)
        }
    });
}

const addWatermark = async (req:Request,res:Response) => {
    
    try {

    
        const watermark=req.query.watermark;
        console.log(watermark)
        const imageName= req.params.image;
        const processedPath:string=path.join(__dirname,`../processed/${imageName}`);
        const imagePath:string=path.join(`../uploads/${imageName}`);

        // Load the image using Sharp
        const imageBuffer = Buffer.from(imagePath, 'base64');
        let sharpImage = sharp(imageBuffer);

        const font = 'Arial';
        const fontSize:number = 48;
        const textWidth = 100;
        sharpImage = sharpImage
        .composite([{
        input: Buffer.from("amer"),
        blend: 'over',
        gravity: 'southeast'
        }])
        
        
        replaceImage(processedPath,imagePath)
        
        res.send("added");
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
   }