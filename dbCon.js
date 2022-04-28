import mysql from 'mysql2/promise'

const con = await mysql.createConnection({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE
});

export default con