import fs from "fs"

// Function to get a list of image file names in the 'uploads' folder
export function getImagesList(): string[] {
    // Directory path
    const directoryPath = './src/uploads/';
    // Read directory contents
    const images =fs.readdirSync(directoryPath);
    return images;
  }


  // Replace original file with resized image
  
  export const replaceImage=  (newPath:string,oldPath:string) :void => {
  
      fs.renameSync(newPath, oldPath);
    
  }
  

  