import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  activities_no: { type: String, unique: true, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Unmarked", "Done", "Canceled"], default: "Unmarked" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Activity", ActivitySchema);
