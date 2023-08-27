import { Router } from "express";
import * as bookingController from "../controllers/booking";
import { authenticate } from "../controllers/auth";

const router: Router = Router();

router.get("/booking", bookingController.getUnavailableBookings);
router.post("/booking", authenticate, bookingController.createBooking);
router.delete("/booking", authenticate, bookingController.deleteBooking);

export default router;

