import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  try {
    const query = "SELECT rooms.id, rooms.home_type, rooms.room_type, rooms.total_occupancy, rooms.total_bedrooms, rooms.summary, rooms.city, rooms.price, media.file_name FROM rooms INNER JOIN media ON rooms.id = media.model_id";

    console.log(query)
    const values = [];
    const [rooms] = await dbconnection.execute(query, values);
    dbconnection.end();
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}