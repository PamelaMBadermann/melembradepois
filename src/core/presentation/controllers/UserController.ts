import { Request, Response } from 'express';

import AppDataSource from "../../../data-source";
import { UsersEntity } from "../../infra/data/database/entity/UsersEntity"

const userRepository = AppDataSource.getRepository(UsersEntity)

export default function makeController(app: any) {
  app.get("/users", async function (req: Request, res: Response) {
    const users = await userRepository.find()

    res.json(users)
  });

  app.post("/users", async function (req: Request, res: Response) {
    const user = new UsersEntity();
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
    let user: UsersEntity | null;
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
    let user: UsersEntity | null;
    user = await userRepository.findOneBy({ uid: req.params.uid })

    if (user != null) {
      await userRepository.remove(user)

      res.json("deleted user")
    } else {
      res.json("delete fail: user undefined")
    }
  });
}