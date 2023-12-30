import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import "reflect-metadata"


import { Router, Request, Response } from 'express';

dotenv.config();

const app = express();

const route = Router()

app.listen(5500, () => console.log('Rodando na porta 5500'))

app.use(cors())

app.use(express.json())

let users = [{
  id: 1,
  name: "pame"
}];

route.get('/', (req: Request, res: Response) => {
  res.json({ message: users })
});

route.post('/', (req: Request, res: Response) => {
  const lastId = users[users.length - 1].id

  users.push({
    id: lastId + 1,
    name: req.body.name,
  });

  res.json("saved user")
});

route.put('/:id', (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('user not found!')
  }

  const updatedUser = {
    ...user,
    name: req.body.name,
  }

  users = users.map(user => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser
    }
    return user
  })

  res.json("updated user")
});

route.delete('/:id', (req: Request, res: Response) => {
  const userId = req.params.id

  users = users.filter(user => Number(user.id) !== Number(userId))

  res.json('Deleted User')
})

app.use(route);