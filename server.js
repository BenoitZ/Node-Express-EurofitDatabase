const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'euro_fit'
});

module.exports = {app, port, connection};