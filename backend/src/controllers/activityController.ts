// src/controllers/activitiesController.ts
import { Request, Response } from "express";
import Activity from "../models/Activity";
import { AuthenticatedRequest } from "../types/express";

// Create a new activity
export const createActivity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { subject, description } = req.body;
  const activities_no = `AC-${Math.floor(1000 + Math.random() * 9000)}`; // Generate unique ID

  try {
    const activity = new Activity({
      activities_no,
      subject,
      description,
      userId: req.user?.userId,
    });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: "Failed to create activity", error });
  }
};

// Get all activities for the logged-in user
export const getActivities = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const activities = await Activity.find({ userId: req.user?.userId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activities", error });
  }
};

// Update an existing activity
export const updateActivity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { subject, description, status } = req.body;

  try {
    const activity = await Activity.findOneAndUpdate(
      { activities_no: id, userId: req.user?.userId },
      { subject, description, status },
      { new: true }
    );

    if (!activity) {
      res.status(404).json({ message: "Activity not found" });
      return;
    }

    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: "Failed to update activity", error });
  }
};

// Delete an activity
export const deleteActivity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const activity = await Activity.findOneAndDelete({
      activities_no: id,
      userId: req.user?.userId,
    });

    if (!activity) {
      res.status(404).json({ message: "Activity not found" });
      return;
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete activity", error });
  }
};
