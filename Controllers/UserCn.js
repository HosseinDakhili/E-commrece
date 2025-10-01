import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcryptjs from "bcryptjs";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id !== req.userId && (req.role != "admin" || req.role != "superAdmin")) {
    return next(
      new HandleERROR("You are not allowed to access this resource", 403)
    );
  }
  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters({ _id: id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate(['favoriteProducts', 'cartId', 'boughtProducts']);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { fullname = null, password = null, role = null } = req.body;
  const { id } = req.params;
  if (id !== req.userId && (req.role != "admin" || req.role != "superAdmin")) {
    return next(
      new HandleERROR("You are not allowed to access this resource", 403)
    );
  }
  const user = await User.findById(id);
  if(!user) return next(new HandleERROR("User not found", 404));
  user.fullname = fullname || user?.fullname || " ";
  if (password) {
    user.password = await bcryptjs.hash(password, 12);
  }
  if (req.role == "superAdmin" && role) {
    user.role = role;
  }
  const newUser = await user.save();
  return res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
