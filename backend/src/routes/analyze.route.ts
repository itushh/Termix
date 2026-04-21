import { Router } from "express";
import multer from "multer";
import { analyzePolicy } from "../controllers/analyze.controller.js";

const analyzeRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

analyzeRouter.post("/", upload.single("file"), analyzePolicy);

export { analyzeRouter };
