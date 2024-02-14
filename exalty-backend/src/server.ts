import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import * as http from "http";
import { json, urlencoded } from "body-parser";
import { routePlugin } from "./routes/route";
import cors from "cors";

const app: Express = express();
// Express configuration for parsing JSON and urlencoded data
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
const port = process.env.API_PORT;
//initialize a simple http server
const server = http.createServer(app);
routePlugin().configureRoute(app);
server.listen(port, () => {
  console.log("Server is running on port " + port);
});
