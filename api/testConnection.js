import pg from "pg";
const {Client} = pg

const client = new Client({
  user: "francisco",
  host: "127.0.0.1",
  database: "instasight",
  password: "admin123",
  port: 5432,
});

client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL!");
    client.end();
  })
  .catch(err => {
    console.error("Connection error:", err);
  });