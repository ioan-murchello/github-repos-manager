import express from "express";
import {
  getUser,
  likedProfiles,
  likeProfile,
  unlikeProfile,
} from "../controllers/users.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/profile/:username", getUser);

router.post("/like-profile/:username", checkAuth, likeProfile);
router.get("/liked-profile", checkAuth, likedProfiles);
router.delete("/unlike-profile/:username", checkAuth, unlikeProfile);

export default router;
