import express from "express";
import { upload_game, upload_player } from "./multerConfig";

const router = express.Router();

router.post("/player", upload_player.single("image"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      fileName: req.file.filename,
    });
  } else {
    res.status(400).send("No image uploaded");
  }
});

router.post("/game", upload_game.single("image"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      fileName: req.file.filename,
    });
  } else {
    res.status(400).send("No image uploaded");
  }
});

export default router;
