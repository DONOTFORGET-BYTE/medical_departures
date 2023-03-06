import { Request, Response } from "express";
import { get, omit } from "lodash";
import connect from "../db/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { _default } from "../../config/default";
let _default_settings = new _default();
const jwtAccessTokenTtl = _default_settings.jwtAccessTokenTtl;
const jwtPrivateKey = _default_settings.jwtPrivateKey;

var conn = connect();

// for registration
export function createUserHandler(req:Request, res: Response) {
    try{

        var sql = "INSERT INTO users SET ?";
        var user = req.body;
        user = omit(user, "passwordConfirmation");
        // console.log('params: ',user); // testing purposes

        // encrypt the password
         bcrypt.genSalt(10, (err, salt) => {
            
            bcrypt.hash(user.password, salt,async(err, hash) => {
                // console.log('hash ', hash); // testing purposes
                user.password = hash;

                await conn.query(sql, user, async function (err: any, result: any) {
                    if (err) throw err;
                    createUserProfileHandler(user.email);

                    return res.status(200).send({
                        email: user.email,
                        user_profile: {
                            name: "",
                            surname: "",
                            phone: ""
                        }
                    });
                });
            }); 
        });

    }catch(e: any){
        return res.status(400).send(e.message);
    }
    
}

// for login
export async function createUserSessionHandler(req:Request, res:Response) {
    //validate the email and password
    var email = req.body.email;
    var password = req.body.password;
    conn.query('SELECT * FROM users WHERE email = ?', email, function(err:any, rows:any, fields:any) {
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
                      user: omit(rows[0],"password")
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


// for profile update
export async function updateUserProfileHandler(req:Request, res: Response) {
    try{

        const userId = req.params.userId;

        var updateInfo = req.body;
        // console.log('info to update ',updateInfo); //testing purposes

        var sql = "UPDATE user_profile SET ? WHERE user_id=?";

        await conn.query(sql, [omit(updateInfo,"email"),userId],async function (err: any, result: any) {
            if (err) throw err;
            if(updateInfo.email !== undefined){
                await conn.query("UPDATE users SET email=? WHERE user_id=?", [updateInfo.email,userId], function (err: any, result: any) {
                    if (err) return res.status(400).send('email is invalid or already registered');
                    return res.status(200).send("Information updated");
                });
            }
            else return res.status(200).send("Information updated");
        });
    

    }catch(e: any){
        return res.status(400).send(e.message);
    }
    
}


// for reading user profile
export async function getUserProfileHandler(req:Request, res: Response) {
    try{

        const userId = get(req, "user.id");

        var sql = "SELECT * FROM user_profile WHERE user_id=?";

        await conn.query(sql, userId, async function (err: any, result: any) {
            if (err) throw err;
            var profile = result[0];
            var sql = "SELECT email FROM users WHERE user_id=?"; 

            await conn.query(sql, userId, function (err: any, result: any) {
            if (err) throw err;
            var email = result[0].email;
            profile.email = email;
            return res.status(200).send(
                    profile
            );
        });
        });
    

    }catch(e: any){
        return res.status(400).send(e.message);
    }
    
}

// for creating user profile attached to user
async function createUserProfileHandler(email:any) {

    await conn.query("SELECT user_id FROM users WHERE email=?", email,async function (err: any, result: any) {
        if (err) throw err;
        var user_profile = {
            name: "",
            surname: "",
            phone: "",
            user_id: result[0].user_id
        }

        var sql = "INSERT INTO user_profile SET ?";
            
        await conn.query(sql, user_profile, function (err: any, result: any) {
            if (err) throw err;
            return user_profile;
        });
    });
   
}
