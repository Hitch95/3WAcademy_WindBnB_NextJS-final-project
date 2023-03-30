import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function DBconnection() {

    const dbconnection = await mysql.createConnection({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return dbconnection;
}