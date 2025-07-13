import { Request, Response } from "express";
import logger from "../utils/logger";
import { loginUser, signupUser, getUserById } from "../services/authService";
export const signUp = async (req: Request, res: Response) => {
  logger.info("Signup route called");
  try {
    const { name, email, password } = req.body;
    const { user, token } = await signupUser(name, email, password);

    res.status(201).json({ user, token });
    logger.info("user created successfully: ", user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    logger.error("Error creating user:", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error || "Login failed" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getUserById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({
      message: err instanceof Error ? err.message : "Failed to fetch user",
    });
  }
};
