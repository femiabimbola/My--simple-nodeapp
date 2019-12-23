import express from "express";
import userController from "../controllers/userController";
import bookingController from "../controllers/bookingController";
import busController from "../controllers/busController";
import tripController from "../controllers/tripController";
import ValidateUser from "../middlewares/validateUser";
import tripValidator from "../middlewares/validateTrip";
import auth from "../middlewares/authenticator";

const router = express.Router();

// User Routes
router.post("/auth/signup", ValidateUser.signup, userController.signup);

router.post("/auth/signin", ValidateUser.signin, userController.signin);

// Buses Panel
router.get("/buses", busController.getBuses);
router.post("/bus", busController.createBus);

// Booking Panel
router.get("/aBookings", bookingController.getBookings);
router.get("/bookings", bookingController.getAllBooking);

// Trip Routes
router.get("/alltrips", tripController.getAllTrips);
router.post(
  "trips",
  auth.authenticateAdmin,
  tripValidator.validateTrip,
  tripController.createTrip
);

export default router;
