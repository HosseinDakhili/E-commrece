import multer from "multer";
import { __dirname } from "../app.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/Public/Uploads`);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload=multer({storage})

export default upload;