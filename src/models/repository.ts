import db from "../db";
import User from "./users.model";
import DatabaseError from "./errors/database.error.models";
 
 
class UserRepository {
  async findAllUsers(): Promise<User[]> {
 
    const query = `
    SELECT userId, email
    FROM application_login
    `;
    const { rows } = await db.query<User>(query);
    return rows || [];
  }
 
  async findById(userId: string): Promise<User> {
 
    try {
      const query = `
      SELECT userId, email
      FROM application_login
      WHERE userId = $1
  `;
      const values = [userId];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user;
    } catch (error) {
      throw new DatabaseError("Error na consulta por id", error);
    }
  }
 
  async create(user: User): Promise<string> {
    const script = `
    INSERT INTO application_login (
      email,
      password
    )
    VALUES ($1, crypt($2, 'my_salt'))
    RETURNING userId
    `;
    const values = [user.email, user.password];
    const { rows } = await db.query<{ userId: string }>(script, values);
    const [newuser] = rows
    return newuser.userId
  }
 
  async update(user: User): Promise<void> {
    const script = `
    UPDATE application_login
    SET
      email = $1,
      password = crypt($2, 'my_salt')
    WHERE userId = $3
    `;
    const values = [user.email, user.password, user.userId];
    await db.query(script, values);
  }
  async remove(userId: string): Promise<void> {
    const script = `
    DELETE
    FROM application_login
    WHERE userId = $1
    `;
    const values = [userId];
    await db.query(script, values);
 
  }
  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
      const query = `
    SELECT userId, email
    FROM application_login
    WHERE email = $1
    AND password = crypt($2, 'my_salt')
    `
      const values = [email, password];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return !user ? null : user; //OU user || null
    } catch (error) {
      throw new DatabaseError('Erro na consulta por usuário Email and password', error);
    }
  }
}
 
export default new UserRepository();