import express from "express";
import {
  createBrand,
  getAllBrand,
  getOneBrand,
  removeBrand,
  updateBrand,
} from "../Controllers/BrandCn.js";
import isAdmin from "../Middlewares/IsAdmin.js";

const brandRouter = express.Router();
brandRouter.route("/").get(getAllBrand).post(isAdmin, createBrand);
brandRouter
  .route("/:id")
  .get(isAdmin, getOneBrand)
  .patch(isAdmin, updateBrand)
  .delete(isAdmin, removeBrand);

export default brandRouter;
