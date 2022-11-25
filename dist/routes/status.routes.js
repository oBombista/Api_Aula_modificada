"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statusRouter = (0, express_1.Router)();
statusRouter.get('/status', (req, res, next) => {
    res.sendStatus(200);
});
exports.default = statusRouter;
