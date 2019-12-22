/* eslint-disable no-console */
import db from "./connection.db";
import { dropTables, createTables } from "./queries";

const {
    dropUserTable, dropBusTable, dropTripTable,
    dropBookingTable,
} = dropTables;

const {
    createUserTable, createBusTable, createTripTable, createBookingTable,
} = createTables;

const dropingTables = async () => {
    try {
        await db.query(dropUserTable);
        await db.query(dropBusTable);
        await db.query(dropTripTable);
        await db.query(dropBookingTable);
    } catch (error) {
        console.log(error);
    }
};

const creatingTables = async () => {
    try {
        await db.query(createUserTable);
        await db.query(createBusTable);
        await db.query(createTripTable);
        await db.query(createBookingTable);
    } catch (error) {
        console.log(error);
    }
};

export {
    dropingTables,
    creatingTables,
};

require("make-runnable");
