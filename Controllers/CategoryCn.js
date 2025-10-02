import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Category from "../Models/CategoryMd.js";
import fs from "fs";
import { __dirname } from "../app.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(200).json({
    success: true,
    data: category,
    message: "دسته‌بندی با موفقیت ایجاد شد",
  });
});

export const getAllCategories = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(req.role == "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .populate()
    .paginate()
    .limitFields();
  const result = features.execute();
  return res.status(200).json(result);
});

export const getOneCategory = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { isPublished: true, _id: req.params.id }
    )
    .filter()
    .sort()
    .populate()
    .paginate()
    .limitFields();
  const result = features.execute();
  return res.status(200).json(result);
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: category,
    message: "دسته‌بندی با موفقیت بروزرسانی شد",
  });
});

export const removeCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Category.find({ categoryId: id });
  const subCategories = await Category.find({ subCategories: id });
  if (products.length > 0 || subCategories.length > 0) {
    return next(
      new HandleERROR(
        "این دسته‌بندی دارای وابستگی است و قابل حذف نمی‌باشد",
        400
      )
    );
  }
  const category = await Category.findById(id);
  if (category.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${category.image}`);
  }

  return res.status(200).json({
    success: true,
    message: "دسته‌بندی با موفقیت حذف شد",
  });
});
