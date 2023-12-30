import express from 'express'
import dotenv from 'dotenv';

import { Router, Request, Response } from 'express';

dotenv.config();

const app = express();

const route = Router()

app.use(express.json())

console.log("oie")

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})

app.use(route)
