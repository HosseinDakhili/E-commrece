import express from "express";
import upload from "./../Utils/Upload.js";
import { removeFile, uploadData } from "../Controllers/UploadCn.js";
const uploadRouter = express.Router();
uploadRouter
  .route("/")
  .post(upload.single("file"), uploadData)
  .delete(removeFile);

export default uploadRouter;
