import { Express, Request, Response } from "express";
import { createBlogHandler, deleteBlogHandler, getBlogHandler, getBlogsHandler, updateBlogHandler } from "./controller/blog.controller";
import { createUserHandler, createUserSessionHandler, getUserProfileHandler, updateUserProfileHandler } from "./controller/user.controller";
import isLoggedIn from "./middleware/isLoggenIn";
import validate from "./middleware/validateRequest";
import { createBlogSchema, deleteBlogSchema, updateBlogSchema } from "./schema/blog.schema";
import { createUserSchema, createUserSessionSchema, updateUserProfileSchema } from "./schema/user.schema";

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

    // get user profile
    app.get(
        "/api/user_profile/:userId",
        isLoggedIn,
        getUserProfileHandler
    );

    // update user profile
    app.put(
        "/api/user_profile/update/:userId",
        [isLoggedIn, validate(updateUserProfileSchema)],
        updateUserProfileHandler
    );

    // create blog 
    app.post(
        "/api/blog/create",
        [isLoggedIn, validate(createBlogSchema)],
        createBlogHandler
    );

    // get blogs
    app.get("/api/blogs", isLoggedIn,getBlogsHandler);

    // get blog
    app.get("/api/blog/:blogId", getBlogHandler);

    // update blog
    app.put(
        "/api/blog/update/:blogId",
        [isLoggedIn, validate(updateBlogSchema)],
        updateBlogHandler
    );

    // delete blog
    app.delete(
        "/api/blog/delete/:blogId",
        [isLoggedIn, validate(deleteBlogSchema)],
        deleteBlogHandler
    );
}
