const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "gutendex"
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
 
  console.log("Database Connected");
});

export default connection;

