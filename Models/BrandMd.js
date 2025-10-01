import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: [true, "title must be unique"]
    },
    image: {
        type: String,
        default: ''
    },
    isPublished: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Brand = mongoose.model("Brand", brandSchema)
export default Brand;