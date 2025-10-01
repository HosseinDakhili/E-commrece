import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: [true, "Phone number must be unique"],
      required: [true, "Phone number is required"],
      match: [/^(\+98|0)?9\d{9}$/, "Invalid phone number"],
    },
    favoriteProducts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    boughtProducts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
    addressIds: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
  },
  { timestamps: true }
);
const User=mongoose.model('User',userSchema)
export default User;