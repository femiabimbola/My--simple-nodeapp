
import IndexModel from "./indexModel";

class BusModel extends IndexModel {
    async createBus({
        plate_number, manufacturer, model, year, capacity,
    }) {
        try {
            const { rows } = await this.insert("plate_number, manufacturer, model, year, capacity", "$1, $2, $3, $4, $5",
                [
                    plate_number.toUpperCase(), manufacturer, model, year, capacity,
                ]);
            return rows[0];
        } catch (error) {
            return error;
        }
    }

    async checkBusExist(column, value) {
        try {
            const { rows } = await this.selectWhere("*", `${column}=$1`, [value]);
            return rows[0];
        } catch (error) {
            return error;
        }
    }

    async getBuses() {
        try {
            const { rows } = await this.select("*");
            return rows;
        } catch (error) {
            return error;
        }
    }
}

export default BusModel;
