/* eslint-disable newline-per-chained-call */
import Express from "express";
import validator from "express-validator";
import Responder from "../helpers/responder";

const app = new Express();
app.use(validator());

class TripValidator {
    static tripValidator(req, res, next) {
        req.checkBody("bus_id").not().isEmpty().withMessage("Bus id is required")
            .isInt().withMessage("Bus Id must be an integer")
            .isInt({ gt: 0 }).withMessage("Bus Id are only positive numbers");
        req.checkBody("origin").not().isEmpty().withMessage("Origin not selected")
            .isLength({ min: 2 }).withMessage("Origin should have more than two characters")
            .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/).withMessage("Origin does not match");
        return req.asyncValidationErrors()
            .then(next)
            .catch((error) => Responder.error(res, 400, error));
    }
}

export default TripValidator;
