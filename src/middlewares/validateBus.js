import Responder from "../helpers/responder";

class busValidator {
  static tripValidator(req, res, next) {
    req
      .check("bus_id")
      .not()
      .isEmpty()
      .withMessage("Bus id is required")
      .isInt()
      .withMessage("Bus Id must be an integer")
      .isInt({ gt: 0 })
      .withMessage("Bus Id are only positive numbers");
    req
      .check("origin")
      .not()
      .isEmpty()
      .withMessage("Origin not selected")
      .isLength({ min: 2 })
      .withMessage("Origin should have more than two characters")
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .withMessage("Origin does not match");
    return req
      .asyncValidationErrors()
      .then(next)
      .catch((error) => Responder.error(res, 400, error));
  }
}

export default busValidator;
