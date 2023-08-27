import { Request, Response } from "express";

import bookingModel from "../models/booking";
import userModel from "../models/user";

export const getUnavailableBookings = async (req: Request, res: Response) => {
  const date = new Date(req.body.date);

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setDate(startDate.getDate() + 1);

  const bookings = await bookingModel.find({
    start: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  return res.status(200).json({ bookings: bookings });
};

export const createBooking = async (req: Request, res: Response) => {
  const email = req.body.decoded.email;
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);

  const user = await userModel.findOne({ email: email });

  const startMinutes = start.getMinutes();

  if (!(startMinutes === 0 || startMinutes === 30)) {
    return res
      .status(400)
      .json({ message: "Start time should be at 0 or 30 minutes" });
  }
  const timeDiff = (end.getTime() - start.getTime()) / (1000 * 60);
  if (!(timeDiff === 30 || timeDiff === 60)) {
    return res
      .status(400)
      .json({ message: "End must be at 30 or 60 minutes after start" });
  }

  const clashingBookings = await bookingModel.find({
    $or: [
      {
        start: {
          $gte: start,
          $lt: end,
        },
      },
      {
        end: {
          $gte: start,
          $lt: end,
        },
      },
    ],
  });

  if (clashingBookings.length > 0) {
    return res
      .status(400)
      .json({ message: "A blocking booking already exists" });
  }

  const booking = await bookingModel.create({
    user: user?._id,
    start: start,
    end: end,
  });
  return res.status(201).json({ booking: booking });
};

export const deleteBooking = async (req: Request, res: Response) => {
  const _id = req.body._id;

  const booking = await bookingModel.findById(_id);

  if (booking?.user.toString() !== req.body.decoded._id.toString()) {
    return res
      .status(403)
      .json({ message: "Access forbidden to delete this booking" });
  }
  await booking?.deleteOne();

  return res.status(200).send();
};

