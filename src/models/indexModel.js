import pool from "../database/connection.db";

class IndexModel {
    constructor(table) {
        this.table = table;
        this.pool = pool;
    }

    async insert(column, selectors, values) {
        const queryStrings = `INSERT INTO ${this.table}(${column})VALUES(${selectors}) returning *`;
        try {
            const response = await this.pool.query(queryStrings, values);
            return response;
        } catch (err) {
            return err;
        }
    }

    async update(column, selectors, values) {
        const queryStrings = `UPDATE ${this.table} SET ${column} WHERE ${selectors} returning *`;
        try {
            const response = await this.pool.query(queryStrings, values);
            return response;
        } catch (err) {
            return err;
        }
    }

    async delete(selector, values) {
        const queryStrings = `DELETE FROM ${this.table} WHERE ${selector}`;
        try {
            const response = await this.pool.query(queryStrings, values);
            return response;
        } catch (err) {
            return err;
        }
    }

    async select(columns) {
        const queryString = `SELECT ${columns} FROM ${this.table}`;
        try {
            const response = await this.pool.query(queryString);
            return response;
        } catch (err) {
            return err;
        }
    }

    async selectWithJoin(column, joinStatement, selectors, values) {
        const queryString = `SELECT ${column} FROM ${this.table} ${joinStatement}
         WHERE ${selectors} `;
        try {
            const response = await this.pool.query(queryString, values);
            return response;
        } catch (err) {
            return err;
        }
    }

    async selectWhere(columns, selector, values) {
        const queryString = `SELECT ${columns} FROM ${this.table} WHERE ${selector}`;
        try {
            const response = await this.pool.query(queryString, values);
            return response;
        } catch (err) {
            return err;
        }
    }
}

export default IndexModel;
