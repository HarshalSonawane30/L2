import express from "express";
import { joinCommunity, getCommunity } from "../controllers/communityController.js";

const router = express.Router();

router.post("/join-community", joinCommunity);
router.get("/community", getCommunity);

export default router;