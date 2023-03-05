import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler } from "./controller/session.controller";
import validate from "./middleware/validateRequest";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";

export default function (app: Express){
    app.get("/healthcheck",(req:Request, res: Response) => res.sendStatus(200));

    //register user
    app.post("/api/users/register",validate(createUserSchema), createUserHandler);

    // Login
    app.post(
        "/api/users/login",
        validate(createUserSessionSchema),
        createUserSessionHandler
    );
}