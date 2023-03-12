const express = require('express');
require("dotenv").config()
const cors = require('cors');
const connectDb = require('./db/db');
const apiRoutes = require('./routes/apiRoutes')
const app = express()
const port = process.env.port || 4000
const allowedOrigins = ['http://localhost:3000', 'https://modern-ecommarce.web.app'];

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
/* connecting to database */
connectDb()

app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }))





app.get("/", (req, res) => {
  res.send("Hello world!Express server is running")
})

app.use("/api", apiRoutes)

const server = app.listen(port, () => {
  console.log(`express server is running on port ${port}`)
})
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});