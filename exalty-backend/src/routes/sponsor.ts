import express from "express";
import SponsorService from "../services/sponsor";
const router = express.Router();

router.get("/", async (req, res) => {
  const games = await SponsorService.getInstance().getAll();
  res.json(games);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, img, link, deleted } = req.body;
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  if (!name || !description || !img || !link) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const updatedSponsor = await SponsorService.getInstance().update(
    id,
    name,
    img,
    description,
    link,
    deleted
  );
  res.json(updatedSponsor);
});

export default router;
