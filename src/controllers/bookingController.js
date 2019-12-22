import moment from "moment";
import BookingModel from "../models/bookingModel";
import tripModel from "../models/tripModel";
import responder from "../helpers/responder";
import errorMsg from "../helpers/errorMessage";

const bookingModel = new BookingModel("bookings");

class BookingController {
  static async createBooking(req, res) {
    try {
      const { trip_id, seat_number } = req.body;
      const tripInfo = await tripModel.getTripInformationQuery(trip_id);
      if (!tripInfo) {
        return responder.error(res, 404, errorMsg.tripNotFound);
      }
      if (tripInfo.status === "cancelled") {
        return responder.error(res, 422, errorMsg.tripCancelled);
      }
      if (seat_number > tripInfo.capacity) {
        return responder.error(res, 406, errorMsg.invalidSeatNumber);
      }
      const pastTrip = moment().isAfter(
        moment(tripInfo.trip_date, "YYYY-MM-DD HH:mm:ss")
      );
      if (pastTrip) {
        return responder.error(res, 422, errorMsg.pastTrip);
      }
      const newBooking = await bookingModel.createBooking(
        req.user.id,
        trip_id,
        seat_number
      );
      const booking = await bookingModel.getBookingById(newBooking.id);
      return responder.success(res, 201, booking[0]);
    } catch (error) {
      return responder.error(res, 500, errorMsg.serverError);
    }
  }

  static async getBookings(req, res) {
    try {
      // They are using req.user.id, req.user.is_admin
      const bookings = await bookingModel.getBooking(
        req.body.id,
        req.body.is_admin
      );

      return responder.success(res, 200, bookings);
    } catch (error) {
      return responder.error(res, 500, errorMsg.serverError);
    }
  }

  static async getAllBooking(req, res) {
    try {
      const allBooking = await bookingModel.getAllbookings();
      return responder.success(res, 200, allBooking);
    } catch (error) {
      return responder.error(res, 500, errorMsg.serverError);
    }
  }
}

export default BookingController;
