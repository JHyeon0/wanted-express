export default class UserDao {
  constructor(database) {
    this.db = database;
  }

  createUser = async ({ email, password, name }) => {
    return await this.db.queryRaw`
      INSERT INTO users(
        email, 
        password, 
        name
      ) VALUES (
        ${email},
        ${password},
        ${name}
      )
    `;
  };

  findUser = async email => {
    return await this.db.queryRaw`
      SELECT id, password FROM users
      WHERE email = ${email}
    `
  }
}