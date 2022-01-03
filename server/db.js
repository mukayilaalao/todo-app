const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  database: "my_todos",
  port: 5432,
  host: "localhost",
  password: "PostGres",
});

module.exports = pool;
