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
export const loginWithPassword = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, password = null } = req?.body
  if (!phoneNumber || !password) return next(new HandleERROR("phoneNumber or password is incorrect", 401));
  const user = await User.findOne({ phoneNumber })
  if (!user) {
    return next(new HandleERROR("phoneNumber or password is incorrect", 401));
  }

  const isMatch = bcryptjs.compareSync(password, user.password)
  if (!isMatch) {
    return next(new HandleERROR("phoneNumber or password is incorrect", 401));
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
  return res.status(200).json({
    success: true,
    data: {
      user, token
    },
    message: "Login successfully"
  })

});

export const loginWithOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, code = null } = req?.body

  if (!phoneNumber || !code) return next(new HandleERROR("Phone number and code are required"));

  const smsResult = await verifyCode(phoneNumber, code)
  if (smsResult.success) {
    return next(new HandleERROR("Invalid code", 401))
  }

  const user = await User.findOne({ phoneNumber })
  let newUser
  if (!user) {
    newUser = await User.create({ phoneNumber })
  } else {
    newUser = user
  }

  const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET)

  return res.status(200).json({
    success: true,
    data: {
      user: newUser, token,

    },
    message: "login successfully"
  })
});

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


export const forgetPassword = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, password = null, code = null } = req?.body
  if (!phoneNumber || !password || !code) return next(new HandleERROR(
    "Phone number, password and code are required"
  ))
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)

  if(!passReg.test(password)){
    return next(new HandleERROR("Error for regex",400))
  }
  const smsResult = verifyCode(phoneNumber,code)
  if(!smsResult.success){
    return next(new HandleERROR("Invalid code",401))
  }
  const user = await User.findOne({ phoneNumber })

  user.password = bcryptjs.hashSync(password, 12)

  await user.save()
  return res.status(200).json({
    success: true,
    message: "password change successfully"
  })

});
