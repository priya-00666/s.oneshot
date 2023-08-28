import otpGenerator from "otp-generator";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import userModel from "../models/user";

interface JWTPayload {
  email: string;
  _id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "oneshot";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const otp = otpGenerator.generate(6);

  let user = await userModel.findOneAndUpdate({ email: email }, { otp: otp });
  if (!user) {
    user = await userModel.create({ email: email, otp: otp });
  }

  const options = {
    from: process.env.MAIL_USER,
    to: email,
    subject: otp,
    text: otp,
  };

  try {
    transporter.sendMail(options);
  } catch {}

  return res.status(200).send();
};

export const loginWithOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "Email is not in db" });
  }

  if (user.otp != otp) {
    return res.status(401).json({ message: "Otp is wrong" });
  }

  const token = jwt.sign({ email: email, _id: user._id }, JWT_SECRET, {
    expiresIn: "12h",
  });

  return res.status(200).cookie("token", token).send();
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  return res.status(200).send();
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (token) {
    const decodedData = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (decodedData) {
      req.body.decoded = decodedData;
      return next();
    }
  }

  return res.status(401).send();
};

