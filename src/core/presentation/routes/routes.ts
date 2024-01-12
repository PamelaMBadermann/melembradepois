import { Request, Response } from 'express';

import makePostItItemsController from '../controllers/PostItItemsController';


export default function makeRoutes(app: any, info: any) {
  const { route, repository, newEntity } = info;

  app.get(`/${route}`, async function (req: Request, res: Response) {
    try {
      let repositoryItems;

      if (route === "users") {
        let repositoryItems = await repository.find()

        res.json(repositoryItems);
      } else {
        let { userUID } = req.body;

        let repositoryItems = await repository.findBy({ userUID: userUID })
        res.json(repositoryItems);
      }

      res.json(repositoryItems);
    } catch (error: any) {
      console.log(error);

      res.json(error.message)
    }
  });

  app.post(`/${route}`, async function (req: Request, res: Response) {
    try {
      if (route === "users") {
        const { username, password } = req.body;

        newEntity.username = username;
        newEntity.password = password;
      } else {
        const { title, description, userUID } = req.body;

        newEntity.title = title;
        newEntity.description = description;
        newEntity.userUID = userUID;
      }
      await repository.save(newEntity)

      res.json("Salvo com sucesso!")
    } catch (error: any) {
      console.log(error);

      res.json(error.message)
    }
  });

  app.get(`/${route}/:uid`, async function (req: Request, res: Response) {
    try {
      const { uid } = req.params;

      if (route === "users") {
        const { password } = req.body;

        let repositoryEntity = await repository.findOneBy({ uid: uid, password: password })

        if (repositoryEntity) {

          makePostItItemsController(app, repositoryEntity.userUID)

          res.json(repositoryEntity)
        } else {
          res.json("Usuário ou  senha incorretos.")
        }
      } else {
        let repositoryEntity = await repository.findOneBy({ uid: uid })

        res.json(repositoryEntity)
      }
    } catch (error: any) {
      console.log(error);

      res.json(error.message)
    }
  });

  app.put(`/${route}/:uid`, async function (req: Request, res: Response) {
    try {
      const { uid } = req.params;

      let repositoryEntity = await repository.findOneBy({ uid: uid })

      if (route === "users") {
        const { username, password } = req.body;

        repositoryEntity.username = username;
        repositoryEntity.password = password;
      } else {
        const { title, description, userUID } = req.body;

        repositoryEntity.title = title;
        repositoryEntity.description = description;
        repositoryEntity.userUID = userUID;
      }

      await repository.save(repositoryEntity)

      res.json("Salvo com sucesso")
    } catch (error: any) {
      console.log(error);

      res.json(error.message)
    }
  });

  app.delete(`/${route}/:uid`, async function (req: Request, res: Response) {
    try {
      const { uid } = req.params;

      const repositoryEntity = await repository.findOneBy({ uid: uid });

      await repository.remove(repositoryEntity)

      res.json("Apagado com sucesso")
    } catch (error: any) {
      console.log(error);

      res.json(error.message)
    }
  });
}