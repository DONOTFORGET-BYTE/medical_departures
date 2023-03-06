
import  awsServerlessExpress  from "aws-serverless-express";

import app from "./src/app"

const server = awsServerlessExpress.createServer(app)

module.exports.universal = (event:any,context:any) => awsServerlessExpress.proxy(server,event,context);

