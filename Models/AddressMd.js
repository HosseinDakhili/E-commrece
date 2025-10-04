import mongoose, { Types } from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "شناسه کاربر الزامی است"],
  },
  street: {
    type: String,
    required: [true, "آدرس خیابان الزامی است"],
  },
  city: {
    type: String,
    required: [true, "شهر الزامی است"],
  },
  state: {
    type: String,
    required: [true, "استان الزامی است"],
  },
  postalCode: {
    type: String,
    required: [true, "کد پستی الزامی است"],
    match: [/^(?!(\d)\1{9})(?!0)\d{10}$/, "کد پستی معتبر نیست"],
  },
  lat: {
    type: Number,
    required: [true, "مختصات عرض جغرافیایی الزامی است"],
  },
  lng: {
    type: Number,
    required: [true, "مختصات طول جغرافیایی الزامی است"],
  },
  receiverPhoneNumber: {
    type: String,
    required: [true, "شماره تلفن گیرنده الزامی است"],
    match: [/^(\+98|0)?9\d{9}$/, "شماره تلفن معتبر نیست"],
  },
  receiverFullname: {
    type: String,
    required: [true, "نام و نام خانوادگی گیرنده الزامی است"],
  },
  pelak: {
    type: String,
    required: [true, "پلاک الزامی است"],
  },
  description: {
    type: String,
    required: [true, "توضیحات آدرس الزامی است"],
  },
  label: {
    type: String,
    required: [true, "برچسب آدرس الزامی است"],
  },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
