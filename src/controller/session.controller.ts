import { Request, Response } from "express";
import connect from "../db/connect";

var conn = connect();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { _default } from "../../config/default";
let _default_settings = new _default();
const jwtAccessTokenTtl = _default_settings.jwtAccessTokenTtl;
const jwtPrivateKey = _default_settings.jwtPrivateKey;

// for login
export async function createUserSessionHandler(req:Request, res:Response) {
    //validate the email and password
    var email = req.body.email;
    var password = req.body.password;
    conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err:any, rows:any, fields:any) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            return res.status(400).send('Please enter valid email and Password!');
        }
        else { 
            // if user found cpmpare passwords
            bcrypt.compare(
                password,
                rows[0]['password'],
                (bErr:any, bResult:any) => {
                  // wrong password
                  if (bErr) {
                    return res.status(401).send({
                      msg: 'Email or password is incorrect!'
                    });
                  }
                  if (bResult) {
                    const token = jwt.sign({id:rows[0].user_id},jwtPrivateKey,{ expiresIn: jwtAccessTokenTtl });
                    return res.status(200).send({
                      msg: 'Logged in',
                      token,
                      user: rows[0]
                    });
                  }
                  return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                  });
                }
            );
        }
    });
}
