import { Request, Response } from "express";
import { get } from "lodash";
import connect from "../db/connect";


var conn = connect();

export async function createBlogHandler(req:Request, res: Response) {
    var blog = req.body;
    const userId = get(req, "user.id");
    // console.log("req ", blog); //testing purposes

    var user_blog = {
        title: blog.title,
        content: blog.content,
        author: userId
    };

    var sql = "INSERT INTO blog SET ?";

    await conn.query(sql, user_blog, function (err: any, result: any) {
        if (err) throw err;
        return res.status(200).send({blog})
    });
    
}

export async function getBlogsHandler(req:Request, res: Response) {
    const userId = get(req, "user.id");

    var sql = "SELECT * FROM blog WHERE author=?";

    await conn.query(sql, userId, function (err: any, result: any) {
        if (err) throw err;
        console.log('result', result); // testing purposes
        return res.status(200).send({blog: result[0]})
    });
    
}

export async function getBlogHandler(req:Request, res: Response) {
    const blogId = req.params.blogId;
    const userId = get(req, "user.id");

    var sql = "SELECT * FROM blog WHERE author=? AND blog_id=?";

    await conn.query(sql, [userId,blogId], function (err: any, result: any) {
        if (err) throw err;
        console.log('result', result); // testing purposes
        return res.status(200).send({blog: result[0]})
    });
    
}

export async function updateBlogHandler(req:Request, res: Response) {
    const userId = get(req, "user.id");
    const blogId = req.params.blogId;
    var blog = req.body;

    var sql = "UPDATE blog SET ? WHERE author = ? AND blog_id = ?";

    await conn.query(sql, [blog,userId,blogId], function (err: any, result: any) {
        if (err) throw err;
        return res.status(200).send({blog: blog})
    });
    
}

export async function deleteBlogHandler(req:Request, res: Response) {
    var blogId = req.params.blogId;

    var sql = "DELETE FROM blog WHERE blog_id = ?";

    await conn.query(sql, blogId, function (err: any, result: any) {
        if (err) throw err;
        return res.status(200).send("blog deleted");
    });
    
}

