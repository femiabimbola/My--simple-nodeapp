import BusModel from "../models/busModel";
import errorMsg from "../helpers/errorMessage";
import responder from "../helpers/responder";

// This instantiate  the class for buses
const busModel = new BusModel("buses");

class BusController {
    static async createBus(req, res) {
        try {
            const number_plate = req.body.number_plate.toUpperCase();
            const busExists = await busModel.checkBusExist("number_plate", number_plate);
            if (busExists) {
                return responder.error(res, 409, `Bus with number plate ${number_plate} has already been added`);
            }
            const newBus = await busModel.createBus(req.body);
            if (!newBus) {
                return new Error(errorMsg.serverError);
            }
            return responder.success(res, 201, newBus);
        } catch (error) {
            return responder.error(res, 500, errorMsg.serverError);
        }
    }

    static async getBuses(req, res) {
        try {
            const buses = await busModel.getBuses();
            return responder.success(res, 200, buses);
        } catch (error) {
            return responder.error(res, 500, errorMsg.serverError);
        }
    }
}


export default BusController;
