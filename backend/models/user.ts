import mongoose from "mongoose";

interface IUser {
  email: string;
  otp: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;

