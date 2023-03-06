import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { _default } from "../../config/default";

let _default_settings = new _default();
const privateKey = _default_settings.jwtPrivateKey;

function verifyJwt(accessToken:any){
  try {
    const decoded = jwt.verify(accessToken, privateKey);

    return { valid: true, expired:false, decoded };
  }catch(error: any){
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}


const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  // console.log('access token found: ',accessToken); // testing purposes

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;
    // console.log('acccess token is valid'); // testing purposes
    return next();
  }

  return next();
};

export default deserializeUser;
