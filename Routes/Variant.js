import express from "express";
import {
  createVariant,
  getAllVariant,
  getOneVariant,
  removeVariant,
  updateVariant,
} from "../Controllers/VariantCn.js";

const variantRouter = express.Router();
variantRouter.route("/").post(createVariant).get(getAllVariant);
variantRouter
  .route("/:id")
  .get(getOneVariant)
  .patch(updateVariant)
  .delete(removeVariant);

export default variantRouter;
