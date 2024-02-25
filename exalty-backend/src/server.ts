import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import * as http from "http";
import { json, urlencoded } from "body-parser";
import { routePlugin } from "./routes/route";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

const app: Express = express();
// Express configuration for parsing JSON and urlencoded data
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  "/uploads/game",
  express.static(path.join(__dirname, "public/uploads/game"))
);
app.use(
  "/uploads/player",
  express.static(path.join(__dirname, "public/uploads/player"))
);
const port = process.env.API_PORT;
//initialize a simple http server
const server = http.createServer(app);
routePlugin().configureRoute(app);
server.listen(port, () => {
  console.log("Server is running on port " + port);
});
