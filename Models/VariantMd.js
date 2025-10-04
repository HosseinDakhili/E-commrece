import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "نوع واریانت الزامی است"],
      enum: {
        values: ["color", "size"],
        message: "نوع واریانت فقط می‌تواند 'color' یا 'size' باشد",
      },
    },
    value: {
      type: String,
      required: [true, "مقدار واریانت الزامی است"],
    },
  },
  { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
