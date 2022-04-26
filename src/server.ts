import app from "./app";
import http from "http";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") dotenv.config();

const PORT = process.env.PORT;
const HOST: any = process.env.HOST;

const server = http.createServer(app);

server.listen(PORT, HOST);
