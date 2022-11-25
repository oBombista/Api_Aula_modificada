"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const status_routes_1 = __importDefault(require("./routes/status.routes"));
const error_handler_middlleware_1 = __importDefault(require("./middllewares/error-handler.middlleware"));
const authorization_routes_1 = __importDefault(require("./routes/authorization.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(users_routes_1.default);
app.use(status_routes_1.default);
app.use(error_handler_middlleware_1.default);
app.use(authorization_routes_1.default);
app.listen("apiaulamodificada-production.up.railway.app", () => {
    console.log('Estou funcionando');
});
