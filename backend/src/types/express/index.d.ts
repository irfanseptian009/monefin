import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string }; // Define the user object type
}
