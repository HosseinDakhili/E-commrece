import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  createCategory,
  getAllCategories,
  getOneCategory,
  removeCategory,
  updateCategory,
} from "../Controllers/CategoryCn.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(isAdmin, createCategory).get(getAllCategories);
categoryRouter
  .route("/:id")
  .get(getOneCategory)
  .patch(isAdmin, updateCategory)
  .delete(isAdmin, removeCategory);

  export default categoryRouter;