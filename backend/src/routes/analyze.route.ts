import { Router } from "express";
import multer from "multer";
import { analyzePolicy, getPreAnalyzedPolicies, getPreAnalyzedPolicyById } from "../controllers/analyze.controller.js";

const analyzeRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

analyzeRouter.post("/", upload.single("file"), analyzePolicy);
analyzeRouter.get("/pre-analyzed", getPreAnalyzedPolicies);
analyzeRouter.get("/pre-analyzed/:id", getPreAnalyzedPolicyById);

export { analyzeRouter };
