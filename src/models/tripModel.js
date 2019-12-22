import IndexModel from "./indexModel";

class TripModel extends IndexModel {

    // Try no to deconstruct it
    async createTripQuery({
        bus_id, origin, destination, trip_date, fare,
    }) {
        try {
            const { rows } = await this.insert(
                "bus_id, origin, destination, trip_date, fare", "$1, $2, $3, $4, $5",
                [
                    bus_id, origin, destination, trip_date, fare,
                ],
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    /**
       * Get trips
       * @returns {object} an object with all trips
       */

    async getTrips() {
        try {
            const { rows } = await this.select("*");
            return rows;
        } catch (error) {
            throw error;
        }
    }

    /**
       * Get filtered trips by a single column
       * @returns {object} an object with all trips
       */

    async getTripsBySingleColumn(column, value) {
        try {
            const { rows } = await this.selectWhere("*", `LOWER(${column}) LIKE LOWER('%${value}%')`);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    /**
       * Get filtered trips by two columns
       * @returns {object} an object with all trips
       */

    async getTripsByTwoColumns(column, value) {
        try {
            const { rows } = await this.selectWhere("*",
                `LOWER(${column[0]}) LIKE LOWER('%${value[0]}%') and LOWER(${column[1]}) LIKE LOWER('%${value[1]}%')`);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Query to cancel a particular trip
     * @param {object} req
     * @param {object} res
     * @returns {object} response object
     */

    async cancelTrip(tripId) {
        try {
            const trip = await this.selectWhere("*", "id=$1", [tripId]);
            if (!trip.rows[0]) {
                return "no-trip";
            } if (trip.rows[0].status === "cancelled") {
                return "already-cancelled";
            }
            const { rows } = await this.update("status=$1", "id=$2", ["cancelled", tripId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get bus capacity, bus id, trip date, and status using trip_id
     * @param {object} trip_id
     * @returns {object}
     */

    static async getTripInformationQuery(trip_id) {
        try {
            const { rows } = await this.selectWithJoin(
                "bus.capacity, bus_id, trip_date, status",
                "JOIN bus ON (trip.bus_id = bus.id)",
                "trip.id=$1",
                [trip_id],
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default TripModel;
