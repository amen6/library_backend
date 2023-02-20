import express from "express";
const router = express.Router();
import controller from "../controllers/book.js";
import upload from '../middleware/images.js'


router.get("/:id", controller.getById);
router.get("/search", controller.getSearch);
router.get("/", controller.getAll);
router.post("/",upload.single("image"), controller.post);
router.put("/:id",upload.single("image"), controller.put);
router.put("/softDelete/:id", controller.put);
router.delete("/:id", controller.delete);

export default router;
