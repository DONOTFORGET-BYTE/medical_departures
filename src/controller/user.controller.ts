import { Request, Response } from "express";
import { omit } from "lodash";
import connect from "../db/connect";
import bcrypt from "bcryptjs";

//TODO define a few more handlers for user here CRUD operations
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

                await conn.query(sql, user, function (err: any, result: any) {
                    if (err) throw err;
                    return res.send(omit(user,"password"));
                });


            });
            
        });

    }catch(e: any){
        return res.status(400).send(e.message);
    }
    
}