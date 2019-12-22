import express from "express";
import userController from "../controllers/userController";
import bookingController from "../controllers/bookingController";
import busController from "../controllers/busController";
import tripController from "../controllers/tripController";
import ValidateUser from "../middlewares/validateUser";
// import Auth from "../middlewares/authenticator";

const routes = express.Router();

// User Routes
routes.post("/auth/signup", ValidateUser.signup, userController.signup);

routes.post("/auth/signin", userController.signin);

// Buses Panel
routes.get("/buses", busController.getBuses);
routes.post("/bus", busController.createBus);

// Booking Panel
routes.get("/aBookings", bookingController.getBookings);
routes.get("/bookings", bookingController.getAllBooking);

// Trip Routes
routes.get("/trips", tripController.getAllTrips);

export default routes;
