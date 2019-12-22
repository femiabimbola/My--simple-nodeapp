const dropTables = {
    dropUserTable: "DROP TABLE IF EXISTS users CASCADE",
    dropBusTable: "DROP TABLE IF EXISTS bus CASCADE",
    dropTripTable: "DROP TABLE IF EXISTS trips CASCADE",
    dropBookingTable: "DROP TABLE IF EXISTS bookings CASCADE",
};

const createTables = {
    createUserTable: `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(40) NOT NULL,
        last_name VARCHAR(40) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(150) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false
    )`,
    createBusTable: `CREATE TABLE IF NOT EXISTS buses (
        bus_id SERIAL PRIMARY KEY,
        manufacturer VARCHAR(40) NOT NULL,
        model VARCHAR(40) NOT NULL,
        plate_number VARCHAR(40) NOT NULL,
        year VARCHAR(4) NOT NULL,
        capacity INTEGER NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
    createTripTable: `CREATE TABLE IF NOT EXISTS trips (
        trip_id SERIAL PRIMARY KEY,
        bus_id INTEGER NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        fare NUMERIC(15, 2) NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
    createBookingTable: `CREATE TABLE IF NOT EXISTS bookings (
        booking_id SERIAL PRIMARY KEY,
        trip_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        seat_number INTEGER NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
    )`,
};

const hashPassword = "dsfrejkdlnvujdidndjdjkkdkdkdk$$$";

const seedData = {
    userTable: `INSERT INTO 
    users ( first_name, last_name, email, password, is_admin)
    VALUES('Joshua', 'James', 'joshuajames@gmail.com', '${hashPassword}', false),
    ('Afolabi', 'Richard', 'aforichard@gmail.com', '${hashPassword}', true)`,

    busTable: `INSERT INTO
    buses (manufacturer, model, plate_number, year, capacity)
    VALUES('Toyota', 'corolla', 'LKD-ER-344', '2014', 18),
    ('Kia', 'sport', 'LLS-DN-64', '2017', 32)`,

    tripTable: `INSERT INTO
    trips (bus_id, origin, destination, fare)
    VALUES (1, 'Ibadan', 'enugu', '8000.00'),
    (2, 'Lagos', 'Abuja', '12000.00')`,

    bookingTable: `INSERT INTO
    bookings (trip_id, user_id, seat_number)
    VALUES(4, 1, 6),
    (5, 3, 8)`,
};

export {
    dropTables,
    createTables,
    seedData,
};
