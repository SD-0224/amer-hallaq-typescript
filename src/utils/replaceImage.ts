import fs from "fs"


// Replace original file with resized image

export const replaceImage= (newPath:string,oldPath:string) :void => {

    fs.renameSync(newPath, oldPath)
  
}
