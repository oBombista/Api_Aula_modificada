"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const usersRoute = (0, express_1.Router)();
usersRoute.get('/users', async (req, res, next) => {
    const users = await user_repository_1.default.findAllUsers();
    res.status(200).send({ users });
});
usersRoute.get('/users/:uuid', async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const user = await user_repository_1.default.findById(uuid);
        res.status(200).send(user);
    }
    catch (error) {
        next(error);
    }
});
usersRoute.post('/users', async (req, res, next) => {
    const newuser = req.body;
    const uuid = await user_repository_1.default.create(newuser);
    res.status(201).send(uuid);
});
usersRoute.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const userId = await user_repository_1.default.findByEmailAndPassword(email, password);
    res.status(200).send(userId);
});
usersRoute.put('/users/:uuid', (req, res, next) => {
    const uuid = req.params.uuid;
    const modifieduser = req.body;
    modifieduser.uuid = uuid;
    res.status(200).send(modifieduser);
});
usersRoute.delete('/users/:uuid', async (req, res, next) => {
    const uuid = req.params.uuid;
    await user_repository_1.default.remove(uuid);
    res.sendStatus(200);
});
exports.default = usersRoute;
