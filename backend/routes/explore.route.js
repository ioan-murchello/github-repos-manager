import express from "express";
const router = express.Router();

import {
    getRepositoriesByLanguage,
} from "../controllers/explore.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

router.get("/explore/:language", checkAuth, getRepositoriesByLanguage);

export default router;