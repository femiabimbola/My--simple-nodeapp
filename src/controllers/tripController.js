import TripModel from "../models/tripModel";
import BusModel from "../models/busModel";
import responder from "../helpers/responder";
import errorMsg from "../helpers/errorMessage";

const tripModel = new TripModel("trips");
const busModel = new BusModel("bus");

class TripController {
  static async createTrip(req, res) {
    try {
      const ifBusExist = await busModel.checkBusExist("id", req.body.bus_id);
      if (!ifBusExist) {
        return responder.error(res, 404, errorMsg.busNotFound);
      }
      const busScheduled = await tripModel.checkBusAvailability(
        req.body.bus_id
      );
      if (busScheduled) {
        return responder.error(res, 409, errorMsg.busNotAvailable);
      }
      const newTrip = await tripModel.createTrip(req.body);
      if (!newTrip) {
        return responder.error(res, 404, errorMsg.cantCreateTrip);
      }
      return responder.success(res, 201, newTrip);
    } catch (error) {
      return responder.error(res, 404, errorMsg.serverError1);
    }
  }
}

export default TripController;
