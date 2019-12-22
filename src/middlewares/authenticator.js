import jwt from "jsonwebtoken";
import env from "dotenv";
import responder from "../helpers/responder";
import errorMsg from "../helpers/errorMessage";
// import { request } from "https";

env.config();

const secretKey = process.env.SECRET_KEY;

class Authenticator {
  static authenticateUser(request, response, next) {
    try {
      let token = request.headers.authorization;
      if (token && token.startsWith("Bearer")) {
        token = token.slice(7, token.length);
      }
      request.user = Authenticator.verifedToken(token);
      return next();
    } catch (error) {
      if (error.message === "jwt expired") {
        return responder.error(response, 419, errorMsg.sessionExpired);
      }
      return responder.error(response, 404, errorMsg.notAuth);
    }
  }

  static verifedToken(token) {
    return jwt.verify(token, secretKey);
  }

  static authenticateAdmin(request, response, next) {
    try {
      let token = request.headers.authorization;
      if (token && token.startsWith("Bearer")) {
        token = token.slice(7, token.length);
      }
      request.user = Authenticator.verifedToken(token);
      if (request.user.is_admin === false) {
        return responder.error(response, 403, errorMsg.notAllowed);
      }
      return next();
    } catch (error) {
      if (error.message === "jwt expired") {
        return responder.error(response, 419, errorMsg.sessionExpired);
      }
      return responder.error(response, 404, errorMsg.notAuth);
    }
  }
}

export default Authenticator;
