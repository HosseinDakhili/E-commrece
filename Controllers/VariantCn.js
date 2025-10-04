import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Variant from "../Models/VariantMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";

export const createVariant = catchAsync(async (req, res, next) => {
  const variant = await Variant.create(req?.body);
  res.status(200).json({
    success: true,
    data: variant,
    message: "واریانت با موفقیت ایجاد شد",
  });
});

export const getAllVariant = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const getOneVariant = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const updateVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: variant,
    message: "واریانت با موفقیت بروزرسانی شد",
  });
});

export const removeVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await ProductVariant.find({ variantId: id });
  if (products.length > 0) {
    return next(
      new HandleERROR("این واریانت به محصولی متصل است و قابل حذف نمی‌باشد", 400)
    );
  }
  await Variant.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "واریانت با موفقیت حذف شد",
  });
});
