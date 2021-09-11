import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { PrismaClient } from '.prisma/client';
import App from "./app";
import { getControllers } from './controllers';
import Service from './services'
import { Database } from './models';

const startServer = () => {
  const scaffoldingMiddlewares = [
    express.json(),
    cors(),
    logger('dev')
  ]
  const prisma = new PrismaClient();
  const db = new Database(prisma);
  const service = new Service(db);
  const controllers = getControllers({ service })

  const appConfig = {
    PORT: process.env.PORT,
    scaffoldingMiddlewares,
    controllers,
  }

  const app = new App(appConfig);
  app.listen();
};

startServer();
