"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const database_error_models_1 = __importDefault(require("./errors/database.error.models"));
class UserRepository {
    async findAllUsers() {
        const query = `
    SELECT userId, email
    FROM application_login
    `;
        const { rows } = await db_1.default.query(query);
        return rows || [];
    }
    async findById(userId) {
        try {
            const query = `
      SELECT userId, email
      FROM application_login
      WHERE userId = $1
  `;
            const values = [userId];
            const { rows } = await db_1.default.query(query, values);
            const [user] = rows;
            return user;
        }
        catch (error) {
            throw new database_error_models_1.default("Error na consulta por id", error);
        }
    }
    async create(user) {
        const script = `
    INSERT INTO application_login (
      email,
      password
    )
    VALUES ($1, crypt($2, 'my_salt'))
    RETURNING userId
    `;
        const values = [user.email, user.password];
        const { rows } = await db_1.default.query(script, values);
        const [newuser] = rows;
        return newuser.userId;
    }
    async update(user) {
        const script = `
    UPDATE application_login
    SET
      email = $1,
      password = crypt($2, 'my_salt')
    WHERE userId = $3
    `;
        const values = [user.email, user.password, user.userId];
        await db_1.default.query(script, values);
    }
    async remove(userId) {
        const script = `
    DELETE
    FROM application_login
    WHERE userId = $1
    `;
        const values = [userId];
        await db_1.default.query(script, values);
    }
    async findByEmailAndPassword(email, password) {
        try {
            const query = `
    SELECT userId, email
    FROM application_login
    WHERE email = $1
    AND password = crypt($2, 'my_salt')
    `;
            const values = [email, password];
            const { rows } = await db_1.default.query(query, values);
            const [user] = rows;
            return !user ? null : user;
        }
        catch (error) {
            throw new database_error_models_1.default('Erro na consulta por usuário Email and password', error);
        }
    }
}
exports.default = new UserRepository();
