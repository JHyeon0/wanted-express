import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const { AUTH_TOKEN_SALT } = process.env;
export default class UserService {
  constructor({ userDao }){
    this.userDao = userDao;
  }

  createUser = async userData => {
    const hashedPassword = await this.createdHashedPassword(userData.password);
    return await this.userDao.createUser({ ...userData, password: hashedPassword });
  };
  
  findUser = async email => {
    const foundUser = await this.userDao.findUser(email)
    return foundUser[0];
  }

  createdHashedPassword = async password => {
    return await bcrypt.hash(password, 10);
  };
  
  isMatchingPassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
  
  getToken = async (id) => {
    const TOKEN_MAINTAINING_HOURS = 24;
    const token = jwt.sign({ id }, AUTH_TOKEN_SALT, {expiresIn: `${TOKEN_MAINTAINING_HOURS}h`});
    return token;
  }
}