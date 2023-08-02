const mysql = require('mysql');

const connection = mysql.createConnection({

    host:'bnjezhfzmw9tsegjwusa-mysql.services.clever-cloud.com',
    user:'ujpxddx9wvcmp9rb',
    password:'pvc0TNGnTE65m3CtdxKW',
    database:'bnjezhfzmw9tsegjwusa',
    port:'3306',
}) 

connection.connect((err) => {
    if(err) throw err;
    console.log('database connected');
})

module.exports={connection};