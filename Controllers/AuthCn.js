import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendAuthCode, verifyCode } from "../Utils/SmsHandler.js";

export const auth = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;
  if (!phoneNumber)
    return next(new HandleERROR("Phone number is required", 400));
  const regexPhone = new RegExp(/^(\+98|0)?9\d{9}$/);
  if (!regexPhone.test(phoneNumber)) {
    return next(new HandleERROR("Invalid phone number format", 400));
  }
  const user = await User.findOne({ phoneNumber });
  if (!user || !user?.password) {
    const smsResult = await sendAuthCode(phoneNumber);
    if (!smsResult.success) {
      return next(new HandleERROR(smsResult.message, 500));
    }
  }
  return res.status(200).json({
    success: true,
    userExist: user ? true : false,
    passwordExist: user?.password ? true : false,
    message: user?.password ? "login with password" : "send verification code",
  });
});
export const loginWithPassword = catchAsync(async (req, res, next) => {});
export const loginWithOtp = catchAsync(async (req, res, next) => {});



export const resendCode = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;
  if (!phoneNumber)
    return next(new HandleERROR("Phone number is required", 400));
  const regexPhone = new RegExp(/^(\+98|0)?9\d{9}$/);
  if (!regexPhone.test(phoneNumber)) {
    return next(new HandleERROR("Invalid phone number format", 400));
  }
   const smsResult = await sendAuthCode(phoneNumber);
    if (!smsResult.success) {
      return next(new HandleERROR(smsResult.message, 400));
    }
    return res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
    });
});




export const forgetPassword = catchAsync(async (req, res, next) => {});
