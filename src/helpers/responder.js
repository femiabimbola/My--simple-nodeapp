/*
    this is to explain each of the equation


*/

class Responder {
  static success(res, statusCode, data) {
    return res.status(statusCode).json({
      message: "sucess boy",
      dataMessage: data
    });
  }

  static error(res, statusCode, error) {
    return res.status(statusCode).json({
      message: "error",
      errorMessage: error
    });
  }
}

export default Responder;
