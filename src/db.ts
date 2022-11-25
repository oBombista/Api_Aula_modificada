import { Pool } from "pg";
 
const connectionString = 'ostgres://ybgcczbj:2C2lw50XZ0IVVDFwvdC1MMQJLOBIlX8C@babar.db.elephantsql.com/ybgcczbj';
 
const db = new Pool({ connectionString });
 
export default db;
 
// Só isso que tem que fazer para conectar o banco de dados
