import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import allRoutes from './routes'
import { notFoundHandler } from './middlewares/errorsHandlers';
import { tokenMiddlware } from './middlewares/token';
dotenv.config();

const prisma = new PrismaClient()
//Framework express
const app = express();

//Middleware
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/api', tokenMiddlware, allRoutes); // http://localhost:5000/api
app.use(notFoundHandler)

export default app;

//front -> miapp.com origen -> petición HTTP -> destino api.miapp.com
//back -> api.miapp.com destino