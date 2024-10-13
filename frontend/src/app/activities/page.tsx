"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setActivities,
  addActivity,
  updateActivity,
  deleteActivity,
} from "../../store/slices/activitiesSlice";
import { logout } from "../../store/slices/userSlice";
import axiosClient from "../../utils/axiosClient";

interface Activity {
  activities_no: string;
  subject: string;
  description: string;
  status: string;
}

export default function Activities() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.activities);
  const { isAuthenticated, token } = useSelector((state: RootState) => state.user);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Unmarked");
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/login");
    }
  }, [isAuthenticated, token, router]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axiosClient.get("/activities");
        dispatch(setActivities(data));
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    if (isAuthenticated && token) {
      fetchActivities();
    }
  }, [dispatch, isAuthenticated, token]);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingActivity) {
        const { data } = await axiosClient.put(
          `/activities/${editingActivity.activities_no}`,
          {
            subject,
            description,
            status,
          }
        );
        dispatch(updateActivity(data));
      } else {
        const { data } = await axiosClient.post("/activities", { subject, description });
        dispatch(addActivity(data));
      }
      resetForm();
    } catch (error) {
      console.error("Error creating/updating activity:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosClient.delete(`/activities/${id}`);
      dispatch(deleteActivity(id));
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push("/login"); // Redirect to login page
  };

  const resetForm = () => {
    setSubject("");
    setDescription("");
    setStatus("Unmarked");
    setEditingActivity(null);
  };

  const startEditing = (activity: Activity) => {
    setEditingActivity(activity);
    setSubject(activity.subject);
    setDescription(activity.description);
    setStatus(activity.status);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Activities</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleCreateOrUpdate}
        className="bg-white p-6 shadow-md rounded mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingActivity ? "Edit Activity" : "Create New Activity"}
        </h2>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
          required
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
        >
          <option value="Unmarked">Unmarked</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded">
            {editingActivity ? "Update Activity" : "Create Activity"}
          </button>
          {editingActivity && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 px-4 py-2 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((activity) => (
          <div key={activity.activities_no} className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-bold mb-2">{activity.subject}</h3>
            <p className="mb-2">{activity.description}</p>
            <p className={`mb-2 ${getStatusClass(activity.status)}`}>
              Status: {activity.status}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => startEditing(activity)}
                className="bg-blue-500 px-4 py-2 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity.activities_no)}
                className="bg-red-500 px-4 py-2 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusClass(status: string) {
  switch (status) {
    case "Done":
      return "text-green-500";
    case "Canceled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}
