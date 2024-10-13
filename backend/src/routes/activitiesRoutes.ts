import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController";

const router = express.Router();

router.post("/", authMiddleware, createActivity);
router.get("/", authMiddleware, getActivities);
router.put("/:id", authMiddleware, updateActivity);
router.delete("/:id", authMiddleware, deleteActivity);

export default router;
