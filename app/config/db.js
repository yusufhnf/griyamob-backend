const mysql = require("mysql");
const dbConfig = require("./db_config.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//Connection Test
connection.connect(
    error => {
        if (error) throw error;
        console.log("Connected to MySQL DB")
    }
);

module.exports = connection;