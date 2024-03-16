import fs from "fs"
import {readdir} from "fs/promises"
import path from "path"
import {Response} from 'express';


// Function to get a list of image file names in the 'uploads' folder
export async function getImagesList(res:Response) {

    // Directory path
    const directoryPath = './src/uploads/';
    // Read directory contents
    try {
       const images= await readdir(directoryPath, "utf8");
       return images;
    } catch (error) {
      console.log(`${directoryPath}: doesn't exist.`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  // Replace original file with resized image
  
  export const replaceImage= async (newPath:string,oldPath:string) :Promise<void> => {

      fs.rename(newPath, oldPath, (error) => {
      console.log(error)

    })
  
}



//define image paths 
export const findPaths = (imageName:String) :string[] => {

  const imagePath:string=path.join(__dirname,`../uploads/${imageName}`);
  const processedPath:string=path.join(__dirname,`../processed/${imageName}`);

  return [imagePath,processedPath]
}


  