import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.model.js";

/* ========================= Validation Schemas ========================= */

const registerSchema = z.object({
  name: z.string().min(1).max(25),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/* ========================= Generate JWT ================================ */

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("ENV VARIABLE NOT PROVIDED : JWT_SECRET");

  return jwt.sign({ id: userId }, secret, {
    expiresIn: "7d",
  });
};

/* ========================= Register Controller ========================= */

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await User.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: ["User already exists"],
      });
    }

    const user = await User.create(validatedData);

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => issue.message),
      });
    }

    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      errors: ["Internal Server error"],
    });
  }
};

/* ========================= Login Controller ============================ */

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({
      email: validatedData.email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: ["Invalid credentials"],
      });
    }

    const isMatch = await user.comparePassword(validatedData.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errors: ["Invalid credentials"],
      });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => issue.message),
      });
    }

    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      errors: ["Internal Server Error"],
    });
  }
};

/* ========================= Logout Controller ========================== */

export const logout = async (_req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      errors: ["Internal Sever Error"],
    });
  }
};
