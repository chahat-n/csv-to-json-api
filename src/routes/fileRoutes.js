//Api route
import express from "express";
import { uploadData } from "../controllers/fileController.js";

const router = express.Router();
router.get("/upload", uploadData);
export default router;
