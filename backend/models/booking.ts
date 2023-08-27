import mongoose, { Schema, Types } from "mongoose";

interface IBooking {
  user: Types.ObjectId;
  start: Date;
  end: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

const bookingModel = mongoose.model<IBooking>("Booking", bookingSchema);

export default bookingModel;

