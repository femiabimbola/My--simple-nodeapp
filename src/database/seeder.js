/* eslint-disable no-console */
import db from "./connection.db";
import { seedData } from "./queries";

const {
    userTable, busTable, tripTable, bookingTable,
} = seedData;

const seeder = async () => {
    try {
        await db.query(userTable);
        await db.query(busTable);
        await db.query(tripTable);
        await db.query(bookingTable);
        console.log("all table seeded");
    } catch (error) {
        console.log(error);
    }
};

// export default seeder;

module.exports = {
    seeder,
};

require("make-runnable");
