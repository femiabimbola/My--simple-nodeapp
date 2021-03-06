import { Pool, types } from "pg";
import dotenv from "dotenv";

dotenv.config();

types.setTypeParser(1700, value => parseFloat(value));

console.log(`You are connected to ${process.env.NODE_ENV}database`);

const connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB
    : process.env.DATABASE_URL;

console.log(connectionString);

const pool = new Pool({ connectionString });

export default class Db {
  static async query(queryStrings, values) {
    let result = "";
    const client = await pool.connect();
    try {
      result = await client.query(queryStrings, values);
      return result;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  }
}
