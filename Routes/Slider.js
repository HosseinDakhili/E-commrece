import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  createSlider,
  getAllSlider,
  removeSlider,
} from "../Controllers/SliderCn.js";

const sliderRouter = express.Router();

sliderRouter.route("/").post(createSlider).get(getAllSlider);
sliderRouter.route("/:id").delete(removeSlider);

export default sliderRouter;
