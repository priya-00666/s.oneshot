import express, { Express } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import bookingRoutes from "./routes/bookings";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);
app.use(bookingRoutes);

const MONGO_URI = process.env.MONGODB_URI!;
const PORT = process.env.PORT!;

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions)
  .then(() => {
    app.listen(PORT);
  })
  .then(() => console.log(`http://localhost:${PORT}`))
  .catch((err) => {
    console.error(err);
  });
