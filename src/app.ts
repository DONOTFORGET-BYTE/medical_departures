import express from "express";
import { _default } from "../config/default";
// import connect from "./db/connect";
import routes from "./routes";

//import models
import { createUsersTable, createUsersProfileTable } from "./model/user.model";
import createBlogTable from "./model/blog.model";
import deserializeUser from "./middleware/deserializeUser";

import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from "../swaggerDocument";

let _default_settings = new _default();
const port = _default_settings.port;
const host = _default_settings.host;

const app = express();
app.use(deserializeUser);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
  // create connection
  // connect();

  //create tables
  createUsersTable();
  createUsersProfileTable();
  createBlogTable();

  routes(app);
});
