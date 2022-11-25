"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_error_models_1 = __importDefault(require("../models/errors/database.error.models"));
const forbidden_error_model_1 = __importDefault(require("../models/errors/forbidden.error.model"));
function errorHandler(error, req, res, next) {
    if (error instanceof database_error_models_1.default) {
        res.sendStatus(400);
    }
    else if (error instanceof forbidden_error_model_1.default) {
        res.sendStatus(403);
    }
    else {
        res.sendStatus(500);
    }
}
exports.default = errorHandler;
