import cryptPassword from "../helpers/cryptpassword";
import indexModel from "./indexModel";

class UsersModel extends indexModel {
  // if i put static, it cannot read the parent class
  async signupQuery({ email, first_name, last_name, password }) {
    const hashedPassword = cryptPassword.hashPassword(password);
    const trimEmail = email.toLowerCase();
    try {
      const data = await this.insert(
        "email, first_name, last_name, password",
        "$1, $2, $3, $4",
        [trimEmail, first_name, last_name, hashedPassword]
      );
      const datas = data.rows;
      console.log(datas[0]);
      return datas[0];
    } catch (error) {
      return error;
    }
  }

  async findUserByEmail(email) {
    try {
      const { rows } = await this.selectWhere("*", "email=$1", [email]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async signinQuery({ email, password }) {
    try {
      const foundUser = await this.findUserByEmail(email);
      if (
        foundUser &&
        cryptPassword.comparePassword(password, foundUser.password)
      ) {
        return foundUser;
      }
      return { error: "Password not a match" };
    } catch (error) {
      return error;
    }
  }

  async findUserById(id) {
    try {
      const { rows } = await this.selectWhere("*", "id=$1", [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default UsersModel;
