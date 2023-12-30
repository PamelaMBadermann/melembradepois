import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import "reflect-metadata"

import { AppDataSource } from "./data-source"
import { UserEntity } from "./entity/UserEntity"
import { Router, Request, Response } from 'express';

dotenv.config();

const app = express();

app.listen(5500, () => console.log('Rodando na porta 5500'))

app.use(cors())

app.use(express.json());

const userRepository = AppDataSource.getRepository(UserEntity)

app.get("/users", async function (req: Request, res: Response) {
  const users = await userRepository.find()

  res.json(users)
});

app.post("/users", async function (req: Request, res: Response) {
  const user = new UserEntity();
  user.username = req.body.username;
  user.password = req.body.password;

  await userRepository.save(user)

  res.json(user)
});

app.get("/users/:uid", async function (req: Request, res: Response) {
  const user = await userRepository.findOneBy({ uid: req.params.uid })

  res.json(user)
});

app.put("/users/:uid", async function (req: Request, res: Response) {
  let user: UserEntity | null;
  user = await userRepository.findOneBy({ uid: req.params.uid })

  if (user != null) {
    if (req.body.username) {
      user.username = req.body.username;
    } else if (req.body.password) {
      user.password = req.body.password;
    } else {
      res.json("nothing change")
    }

    await userRepository.save(user)
  } else {
    res.json("put fail: user undefined")
  }

  res.json(user)
});

app.delete("/users/:uid", async function (req: Request, res: Response) {
  let user: UserEntity | null;
  user = await userRepository.findOneBy({ uid: req.params.uid })

  if (user != null) {
    await userRepository.remove(user)

    res.json("deleted user")
  } else {
    res.json("delete fail: user undefined")
  }
});