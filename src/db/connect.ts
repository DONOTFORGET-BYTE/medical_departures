import { _default } from "../../config/default";

let _default_settings = new _default();
const host = _default_settings.host;
const user = _default_settings.user;
const password = _default_settings.password;
const dbname = _default_settings.database;

//file establishes connection to the db
function connect(){
    var mysql = require('mysql');
    var conn = mysql.createConnection({
      host: host, // Replace with your host name
      user: user,      // Replace with your database username
      password: password,      // Replace with your database password
      database: dbname // // Replace with your database Name
    }); 
     
    conn.connect(function(err: any) {
      if (err) throw err;
      console.log('Database is connected successfully !'); //testing purposes only
    });

    return conn;
}

export default connect;
