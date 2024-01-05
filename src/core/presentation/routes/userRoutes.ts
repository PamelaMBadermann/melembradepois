import { Request, Response } from 'express';

import AppDataSource from "../../../data-source";
import { UsersEntity } from '../../infra/data/database/entity/UsersEntity';
import makePostItItemRoutes from './postItItemRoutes';

export default function makeUserRoutes(app: any) {
  const newUser = new UsersEntity();
  const repository = AppDataSource.getRepository(UsersEntity);

  app.get("/users", async function (req: Request, res: Response) {
    const users = await repository.find()

    res.json(users);
  });

  app.post("/users", async function (req: Request, res: Response) {
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    await repository.save(newUser)

    res.json(newUser)
  });

  app.get("/users/:uid", async function (req: Request, res: Response) {
    let user = await repository.findOneBy({ uid: req.params.uid })

    if (user != null || undefined) {
      let uid = req.params.uid;

      makePostItItemRoutes(app, uid)

      res.json(user)
    }
  });

  app.put("/users/:uid", async function (req: Request, res: Response) {
    let user = await repository.findOneBy({ uid: req.params.uid })

    if (user != null) {
      if (req.body.username) {
        user.username = req.body.username;
      } else if (req.body.password) {
        user.password = req.body.password;
      } else {
        res.json("nothing change")
      }

      await repository.save(user)

      res.json(user)
    } else {
      res.json("user undefined")
    }

  });

  app.delete("/:uid", async function (req: Request, res: Response) {
    let user = await repository.findOneBy({ uid: req.params.uid })

    if (user != null) {
      await repository.remove(user)

      res.json("deleted")
    } else {
      res.json("delete fail: undefined")
    }
  });
}