import { catchAsync, HandleERROR } from "vanta-api";
import fs from 'fs'
import { __dirname } from "../app.js";
export const uploadData=catchAsync(async (req,res,next) => {
    const file=req.file
    if(!file){
        return next(new HandleERROR("No file uploaded", 400));
    }
    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: file,
    });
})
export const removeFile=catchAsync(async (req,res,next) => {
    const {filename=null}=req.body
    if(!filename){
        return next(new HandleERROR("No filename provided", 400));
    }
    const normalizationFileName=filename.split('/').at(-1)
    if(!normalizationFileName){
        return next(new HandleERROR("Invalid filename", 400));
    }
    const filePath=`${__dirname}/Public/Uploads/${normalizationFileName}`
    fs.unlink(filePath,(err)=>{
        if(err){
            return next(new HandleERROR("Error deleting file", 500));
        }
        res.status(200).json({
            success: true,
            message: "File deleted successfully",
        });
    })
})