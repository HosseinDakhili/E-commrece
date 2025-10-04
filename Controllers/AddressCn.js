import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Address from "../Models/AddressMd.js";
import User from "../Models/UserMd.js";

export const createAddress = catchAsync(async (req, res, next) => {
  const address = await Address.create({ ...req.body, userId: req.userId });
  await User.findByIdAndUpdate(req.userId, {
    $push: { addressIds: address._id },
  });
  res.status(200).json({
    success: true,
    data: address,
    message: "آدرس با موفقیت ایجاد شد",
  });
});

export const getAllAddresses = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(req.role == "admin" ? {} : { userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const getOneAddress = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { userId: req.userId, _id: req.params.id }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const updateAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId = null, ...updatedData } = req.body;
  const searchQuery =
    req.role == "admin" ? { _id: id } : { userId: req.userId, _id: id };
  const address = await Address.findOneAndUpdate(searchQuery, updatedData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: address,
    message: "آدرس با موفقیت ویرایش شد",
  });
});

export const removeAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const address = await Address.findById(id);
  if (address.userId != req.userId && req.role != "admin") {
    return next(new HandleERROR("شما دسترسی به حذف این آدرس ندارید", 403));
  }
  await address.remove();
  await User.findByIdAndUpdate(req.userId, {
    $pull: { addressIds: id },
  });

  return res.status(200).json({
    success: true,
    message: "آدرس با موفقیت حذف شد",
  });
});
