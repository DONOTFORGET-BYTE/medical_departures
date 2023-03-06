import connect from "../db/connect";

var conn = connect();

function createUsersTable(){
    var sql = "CREATE TABLE IF NOT EXISTS users(user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) not null, password VARCHAR(255) not null)";

    conn.query(sql, function (err: any, result: any) {
        if (err) throw err;
        console.log("users table created"); //testing purposes
    });

}

export default createUsersTable;
