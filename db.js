import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "database-1.cnuucog0ml6k.ap-northeast-3.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "database",
  database: "todo_app",
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
