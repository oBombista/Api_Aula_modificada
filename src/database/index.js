
import { Pool } from "pg";
 
const connectionString = 'postgres://ybgcczbj:2C2lw50XZ0IVVDFwvdC1MMQJLOBIlX8C@babar.db.elephantsql.com/ybgcczbj';
 
const db = new Pool({ connectionString });

export default db;