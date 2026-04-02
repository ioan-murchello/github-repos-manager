import express from "express";
const router = express.Router();

import {
    getRepositoriesByLanguage,
} from "../controllers/explore.controller.js";

router.get("/explore/:language", getRepositoriesByLanguage);

export default router;