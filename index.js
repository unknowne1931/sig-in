require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const fs = require('fs')
const https = require('https')



// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({
    origin: ['https://stawro.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')
const cred = {
  key,
  cert
}

const httpsServer = https.createServer(cred, app)
httpsServer.listen(443);
