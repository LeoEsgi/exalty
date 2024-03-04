import express from "express";
import {
  upload_game,
  upload_player,
  upload_sponsor,
  upload_product,
  upload_match,
} from "./multerConfig";

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

router.post("/sponsor", upload_sponsor.single("image"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      fileName: req.file.filename,
    });
  } else {
    res.status(400).send("No image uploaded");
  }
});

router.post("/product", upload_product.single("image"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      fileName: req.file.filename,
    });
  } else {
    res.status(400).send("No image uploaded");
  }
});

router.post("/match", upload_match.single("image"), (req, res) => {
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
