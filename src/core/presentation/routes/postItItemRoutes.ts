import { Request, Response } from 'express';

import AppDataSource from "../../../data-source";
import { PostItItemsEntity } from '../../infra/data/database/entity/PostItItemsEntity';

export default function makePostItItemRoutes(app: any, uid: string) {
  const repository = AppDataSource.getRepository(PostItItemsEntity);

  app.get(`/${uid}/postItItems`, async function (req: Request, res: Response) {
    const postItItems = await repository.find()

    res.json(postItItems);
  });

  app.post(`/${uid}/postItItems`, async function (req: Request, res: Response) {
    const newPostItItem = new PostItItemsEntity();

    newPostItItem.title = req.body.title;
    newPostItItem.description = req.body.description;
    newPostItItem.userUID = uid;

    await repository.save(newPostItItem)

    res.json(newPostItItem)
  });

  app.get(`/${uid}/postItItems/:uid`, async function (req: Request, res: Response) {
    let user = await repository.findOneBy({ uid: req.params.uid })

    res.json(user)
  });

  app.put(`/${uid}/postItItems/:uid`, async function (req: Request, res: Response) {
    let user = await repository.findOneBy({ uid: req.params.uid })

    if (user != null) {
      if (req.body.title) {
        user.title = req.body.title;
      } else if (req.body.description) {
        user.description = req.body.description;
      } else {
        res.json("nothing change")
      }

      await repository.save(user)

      res.json(user)
    } else {
      res.json("user undefined")
    }

  });

  app.delete(`/${uid}/postItItems/:uid`, async function (req: Request, res: Response) {
    let user = await repository.findOneBy({ uid: req.params.uid })

    if (user != null) {
      await repository.remove(user)

      res.json("deleted")
    } else {
      res.json("delete fail: undefined")
    }
  });
}