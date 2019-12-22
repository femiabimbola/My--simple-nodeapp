import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.NODE_ENV === "diff_test" ? process.env.DIFF_TEST_DB : process.env.DIFF_DEV_DB;


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
