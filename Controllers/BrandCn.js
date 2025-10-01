import Brand from "../Models/BrandMd.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
export const create = catchAsync(async (req, res, next) => {
  const brand = await Brand.create(req.body);
  res.status(201).json({
    status: "success",
    data: brand,
    message: "Brand created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters(req.role == 'admin' ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
 
 return res.status(200).json({
    status: "success",
    data: brand,
    message: "Brand updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.find({ brandId: id });
  if(products.length>0){({ brandId: id });
    return next(new HandleERROR("Cannot delete brand with associated products", 400));
  }
  await Brand.findByIdAndDelete(id);
  return res.status(204).json({
    status: "success",
    data: null,
    message: "Brand deleted successfully",
  });
});
