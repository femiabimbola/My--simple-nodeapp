class userValidator {
  static signup(req, res, next) {
    req
      .checkBody("first_name")
      .notEmpty()
      .withMessage("First Name is required")
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage("First Name Input is Invalid")
      .customSanitizer(name => name.toLowerCase());
    req
      .checkBody("last_name")
      .notEmpty()
      .withMessage("Last Name is required")
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage("Last Name Input is Invalid")
      .customSanitizer(name => name.toLowerCase());
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .trim()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .withMessage("Input a valid email")
      .customSanitizer(name => name.toLowerCase());
    req
      .checkBody("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password Should have a minimum length of 6");
    req
      .asyncValidationErrors()
      .then(next)
      .catch(errors =>
        res.status(400).json({
          status: "error",
          error: errors.map(err => err.msg)
        })
      );
  }

  static signin(req, res, next) {
    req
      .checkBody("firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage("First Name Input is Invalid")
      .customSanitizer(name => name.toLowerCase());
    req
      .checkBody("lastName")
      .notEmpty()
      .withMessage("Last Name is required")
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage("Last Name Input is Invalid")
      .customSanitizer(name => name.toLowerCase());
    req
      .asyncValidationErrors()
      .then(next)
      .catch(errors =>
        res.status(400).json({
          status: "error",
          error: errors.map(err => err.msg)
        })
      );
  }
}

export default userValidator;
