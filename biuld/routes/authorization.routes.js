"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forbidden_error_model_1 = __importDefault(require("../models/errors/forbidden.error.model"));
const authorizationRoute = (0, express_1.Router)();
authorizationRoute.post('/token', (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    try {
        if (!authorizationHeader) {
            throw new forbidden_error_model_1.default('Credenciais não informadas');
        }
        const [autenthicationType, token] = authorizationHeader.split(' ');
        if (autenthicationType !== 'Basic' || !token) {
            throw new forbidden_error_model_1.default('Tipo de Autenticação inválida');
        }
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        console.log(tokenContent);
        const [username, password] = tokenContent.split(':');
        console.log(username, password);
        if (!username || !password) {
            throw new forbidden_error_model_1.default('Credenciais não preenchidas');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = authorizationRoute;
