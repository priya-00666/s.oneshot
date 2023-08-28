import { Router } from "express";
import * as bookingController from "../controllers/booking";
import { authenticate } from "../controllers/auth";

const router: Router = Router();

router.post("/booking", authenticate, bookingController.getUnavailableBookings);
router.post("/booking/book", authenticate, bookingController.createBooking);
router.delete("/booking", authenticate, bookingController.deleteBooking);
router.post("/mybookings", authenticate, bookingController.getUserbookings);

export default router;

