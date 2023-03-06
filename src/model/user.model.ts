import connect from "../db/connect";

var conn = connect();

export function createUsersTable(){
    var sql = "CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,user_id int NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) not null,FOREIGN KEY (user_id) REFERENCES users(user_id))";

    conn.query(sql, function (err: any, result: any) {
        if (err) throw err;
        // console.log("users table created"); //testing purposes
    });

}

export function createUsersProfileTable(){
    var sql = "CREATE TABLE IF NOT EXISTS user_profile(user_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), surname VARCHAR(255), phone VARCHAR(15))"
    conn.query(sql, function (err: any, result: any) {
        if (err) throw err;
        // console.log("users_profile table created"); //testing purposes
    });

}
