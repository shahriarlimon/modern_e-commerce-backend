const express = require('express');
require("dotenv").config()
const cors = require('cors');
const { connect } = require('http2');
const connectDb = require('./db/db');
const app = express()
const port = process.env.port || 4000
/* connecting to database */
connectDb()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))


app.get("/", (req, res) => {
    res.send("Hello world!Express server is running")
})
app.listen(port, () => {
    console.log(`express server is running on port ${port}`)
})