import connect from "../db/connect";

var conn = connect();

function createBlogTable(){
    var sql = "CREATE TABLE IF NOT EXISTS blog(blog_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,author int NOT NULL, title VARCHAR(50), content VARCHAR(255),FOREIGN KEY (author) REFERENCES users(user_id))";

    conn.query(sql, function (err: any, result: any) {
        if (err) throw err;
        // console.log("blog table created"); //testing purposes
    });

}

export default createBlogTable;
