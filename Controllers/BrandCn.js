import Brand from "../Models/BrandMd.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import fs from "fs";
import { __dirname } from "../app.js";

export const createBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.create(req.body);
  res.status(200).json({
    success: true,
    data: brand,
    message: "برند با موفقیت ایجاد شد",
  });
});

export const getAllBrand = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters(req.role == "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const getOneBrand = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const updateBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = Brand.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: brand,
    message: "برند با موفقیت بروزرسانی شد",
  });
});

export const removeBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.find({ brandId: id });
  if (products.length > 0) {
    return next(
      new HandleERROR("این برند به محصولی متصل است و قابل حذف نیست", 400)
    );
  }

  const brand = await Brand.findByIdAndDelete(id);
  if (brand.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${brand.image}`);
  }
  return res.status(200).json({
    success: true,
    data: null,
    message: "برند با موفقیت حذف شد",
  });
});
