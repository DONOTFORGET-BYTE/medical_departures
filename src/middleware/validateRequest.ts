import { Schema } from "yup";
import { Request, Response, NextFunction } from "express";

const validate = (schema: Schema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    }catch(e: any){
        return res.status(400).send(e.errors);
    }
};

export default validate;