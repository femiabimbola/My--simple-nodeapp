import bcrypt from "bcrypt";
import env from "dotenv";


env.config();


// Number means something o
const hashPassword = (password) => bcrypt.hashSync(password, 15);

const comparePassword = (userPass, hashedPassword) => bcrypt.compareSync(userPass, hashedPassword);

export default { hashPassword, comparePassword };
