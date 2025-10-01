import express from 'express'
import { auth, forgetPassword, loginWithOtp, loginWithPassword, resendCode } from '../Controllers/AuthCn.js';
const authRouter = express.Router();
authRouter.route('/').post(auth)
authRouter.route('/login-password').post(loginWithPassword)
authRouter.route('/login-otp').post(loginWithOtp)
authRouter.route('/resend-code').post(resendCode)
authRouter.route('/forget-password').post(forgetPassword)

export default authRouter;