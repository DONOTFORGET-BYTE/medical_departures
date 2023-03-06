import connect from "../db/connect";

var conn = connect();

function createUsersProfileTable(){
    var sql = "CREATE TABLE IF NOT EXISTS users_profile(user_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255, surname VARCHAR(255), phone VARCHAR(15))";

    conn.query(sql, function (err: any, result: any) {
        if (err) throw err;
        console.log("users_profile table created"); //testing purposes
    });

}

export default createUsersProfileTable;
