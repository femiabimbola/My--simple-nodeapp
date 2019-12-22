import UsersModel from "../models/usersModel";
import generateToken from "../helpers/token";
import responder from "../helpers/responder";
import errorMsg from "../helpers/errorMessage";

const usersModel = new UsersModel("users");

class UserController {
  static async signup(req, res) {
    try {
      const alreadyRegistered = await usersModel.findUserByEmail(
        req.body.email
      );
      if (alreadyRegistered) {
        return responder.error(res, 409, errorMsg.emailExits);
      }
      const newUser = await usersModel.signupQuery(req.body);
      if (!newUser) {
        return responder.error(res, 403, errorMsg.cantcreate);
      }
      const userData = UserController.createUserObject(newUser);
      return responder.success(res, 201, userData);
    } catch (error) {
      return responder.error(res, 500, errorMsg.serverError1);
    }
  }

  // In a class this can be an object
  static createUserObject(newUser) {
    const userData = {
      user_id: newUser.user_id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      is_admin: newUser.is_admin,
      password: newUser.password,
      token: generateToken(newUser)
    };
    return userData;
  }

  static async signin(req, res) {
    try {
      // You need email and password to sign in
      const signInResult = await usersModel.signinQuery(req.body);
      if (signInResult.error === "Password not a match") {
        return responder.error(res, 403, errorMsg.loginFailure);
      }
      if (!signInResult) {
        return responder.success(res, 403, errorMsg.serverError);
      }
      console.log(signInResult);
      const userData = UserController.createUserObject(signInResult);
      return responder.success(res, 200, userData);
    } catch (error) {
      return responder.error(res, 500, errorMsg.serverError);
    }
  }
}

export default UserController;
