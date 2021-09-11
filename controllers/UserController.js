import { Router } from 'express';
import { validation, error } from "../utils";
import { createError } from '../utils/error'

export default class UserController {
  #service

  constructor({ service, middlewares }){
    this.path = '/users';
    this.#service = service;
  }

  get router() {
    const router = Router();
    router.post('/signup', this.#signUp);
    router.post('/login', this.#login);
    return router;
  }

  #signUp = async (req, res) => {
    try {
      const { email, password, name } = req.body;
      console.log(email, password, name);

      if (!validation.isValidEmail(email)) throw createError(401, "INVALID EMAIL");
  
      if (!validation.isValidPassword(password)) throw createError(401, "INVALID PASSWORD");
  
      if (!validation.isValidName(name)) throw createError(401, "INVALID NAME");
  
      await this.#service.userService.createUser({ email, password, name });
  
      res.status(201).json({ message: "USER CREATED" });
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || "INTERNAL SERVER ERROR" });
    }
  }

  #login = async (req, res) => {
    try {
      const { email, password: inputPassword } = req.body
      const foundUser = await this.#service.userService.findUser(email)
  
      if(!foundUser) 
        throw createError(401, "INVALID EMAIL OR PASSWORD")
  
      const { id, password: hashedPassword } = foundUser;
      const isValidPassword = await this.#service.userService.isMatchingPassword(inputPassword, hashedPassword)
  
      if(!isValidPassword)
        throw createError(401, "INVALID EMAIL OR PASSWORD")
  
      const token = await this.#service.userService.getToken(id);
  
      res.status(201).json({ message: "LOGIN SUCCESS", token })
  
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || "INTERNAL SERVER ERROR" });
    }
  }
}