"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = 'ostgres://ybgcczbj:2C2lw50XZ0IVVDFwvdC1MMQJLOBIlX8C@babar.db.elephantsql.com/ybgcczbj';
const db = new pg_1.Pool({ connectionString });
exports.default = db;
