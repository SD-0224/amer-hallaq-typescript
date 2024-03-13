import multer from "multer"


//set up storage for uploaded files
const storage= multer.diskStorage({
  destination: (req, file, setDest) => {
  console.log("the file is",file)
  setDest(null, 'src/uploads/');
  },
  filename: (req, file, setName) => {
  setName(null,file.originalname);
  }
  });

  //check file type, accept only images
  const checkFileType= (file:Express.Multer.File, cb:multer.FileFilterCallback) :void => {
    // Allowed mimetypes
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      // Accept file
      cb(null, true);
    } else {
      // Reject file
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
    }
  }
  
  //Create our middleware function as specified storage and limit size to 2 MB, filter to accept only images
  const upload = multer({storage,
                        limits: {fileSize: 2 * 1024 * 1024},
                        fileFilter(req, file, callback) {
                          checkFileType(file,callback)
                        }})


export default upload;