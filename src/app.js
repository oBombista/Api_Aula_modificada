import express, { Router } from "express";
import cors from "cors";
import "./database";

import routes from "./routes";
const cors = require("cors");

class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes(){
        this.server.use(routes);
    }

}

export default new App().server;
