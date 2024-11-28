const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
var cors = require('cors')
const odbc = require('odbc');

// create our express app
const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// route
const routes = require('./Routes/Route')
app.use(cors())
app.use('/', routes)

async function queryAccess() {
    const connection = await odbc.connect('dsn=mssql;encrypt=no;UID=sa;PWD=12345678;Database=mydb');
    const data = await connection.query('SELECT * FROM username_password');
    for (var i = 0 ; i < data.length ; i++)
        console.log(data[i]['myusername']+"@"+data[i]['mypassword']);
    } 
queryAccess();

