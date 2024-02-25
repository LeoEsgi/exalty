import { game } from "@prisma/client";
import express from "express";
import RecruitmentService from "../services/recruitment";
const router = express.Router();

router.get("/", async (req, res) => {
  const games = await RecruitmentService.getInstance().getAll();
  res.json(games);
});

router.get("/category", async (req, res) => {
  const category = await RecruitmentService.getInstance().getCategories();
  res.json(category);
});
router.get("/category/:id/sub-category", async (req, res) => {
  const id = parseInt(req.params.id);
  const subCategory =
    await RecruitmentService.getInstance().getSubCategoriesByCategoryId(id);
  res.json(subCategory);
});
router.get("/sub-category", async (req, res) => {
  const subCategory = await RecruitmentService.getInstance().getSubCategories();
  res.json(subCategory);
});

export default router;
