import express from "express";
import { _default } from "../config/default";
import connect from "./db/connect";
import routes from "./routes";

//import schema/models
import createUsersTable from "./model/user.model";
// import createUsersProfileTable from "./model/user_profile,model";
// import createBlogTable from "./model/blog.model";

let _default_settings = new _default();
const port = _default_settings.port;
const host = _default_settings.host;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
  // create connection
  connect();

  //create tables
  createUsersTable();
  // createUsersProfileTable();
  // createBlogTable();

  routes(app);
});