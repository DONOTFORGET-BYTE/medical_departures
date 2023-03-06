import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const user = get(req, "user");

    // console.log('user ',user); // testing purposes
  
    if (!user) {
      return res.sendStatus(403);
    }
  
    return next();
  };
  
  export default isLoggedIn;