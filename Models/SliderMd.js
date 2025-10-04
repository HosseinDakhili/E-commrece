import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "عنوان اسلایدر الزامی است"],
    unique: [true, "این عنوان اسلایدر قبلاً ثبت شده است"],
  },
  image: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const Slider = mongoose.model("Slider", sliderSchema);

export default Slider;
