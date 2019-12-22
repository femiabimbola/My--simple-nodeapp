import IndexModel from "./indexModel";

class BookingModel extends IndexModel {
    async createBooking(user_id, trip_id, seat_number) {
        try {
            const { datas } = await this.insert("user_id, trip_id, seat_number", "$1, $2, $3", [
                user_id, trip_id, seat_number,
            ]);
            return datas[0];
        } catch (error) {
            return error;
        }
    }

    async getBooking(user_id, is_admin) {
        try {
            if (is_admin) {
                const { datas } = await this.selectWithJoin("booking.id as booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name", "last_name, email, booking.created_on", "JOIN trip ON (booking. trip_id = trip.id) JOIN users ON (booking.user_id = user.id)", "true");
                // Nothing to make it look like an array
                return datas;
            }
            const { rows } = await this.selectWithJoin("booking.id as booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, booking.created_on",
                "JOIN trip ON (booking.trip_id = trip.id) JOIN users ON (booking.user_id = users.id)",
                "booking.user_id=$1",
                [user_id]);
            return rows;
        } catch (error) {
            return error;
        }
    }

    async getBookingById(booking_id) {
        try {
            const { rows } = await this.selectWithJoin(
                "booking.id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name. email, booking.created_on",
                "JOIN trip ON (booking.trip_id = trip.id) JOIN users ON (booking.user_id = users.id)",
                "booking.id=$1",
                [booking_id],
            );
            return rows;
        } catch (error) {
            return error;
        }
    }


    async getBookedSeats(trip_id) {
        try {
            const { rows } = await this.selectWhere("seat_number", "trip_id=$1", [trip_id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAllbookings() {
        try {
            const { rows } = await this.select("*");
            return rows;
        } catch (error) {
            return error;
        }
    }
}

export default BookingModel;

