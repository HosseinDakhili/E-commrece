import fs from "fs";
import { __dirname } from "../app.js";
import ApiFeatures, { catchAsync } from "vanta-api";
import Slider from "../Models/SliderMd.js";

export const createSlider = catchAsync(async (req, res, next) => {
  const slider = await Slider.create(req.body);
  res.status(200).json({
    success: true,
    data: slider,
    message: "اسلایدر با موفقیت ایجاد شد",
  });
});

export const getAllSlider = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Slider, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = features.execute();
  return res.status(200).json(result);
});

export const removeSlider = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findByIdAndDelete(id);
  if (slider.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${slider.image}`);
  }

  return res.status(200).json({
    success: true,
    message: "اسلایدر با موفقیت حذف شد",
  });
});
