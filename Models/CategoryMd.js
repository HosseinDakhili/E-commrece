import mongoose from "mongoose";

const categorySchema =new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان دسته‌بندی الزامی است"],
      unique: [true, "این عنوان دسته‌بندی قبلاً ثبت شده است"],
    },
    image: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
