import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, ""],
      enum: ["color", "size"],
    },
    value: {
      type: String,
      required: [true, ""],
    },
  },
  { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
