import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
export  const upload = multer({ 
    storage,
    limits: {fileSize: 1024 * 1024},
    fileFilter: (req, file, cb)=>{
        if(!!["image/jpeg", "image/png", "image/jpg"].find(e=>e===file.mimetype))
            return cb(null, true);
        cb({"error": "Unsupported file Format, upload only JPG, JPEG, PNG files."}, false);

        
    }
 })
 .single("image");