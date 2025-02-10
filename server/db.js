require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
  // user: process.env.DB_USER,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT,
  // host: process.env.DB_HOST,
  // password: process.env.DB_PASSWORD,
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
