import AppDataSource from "../../../data-source";
import { PostItItemsEntity } from "../../infra/data/database/entity/PostItItemsEntity";
import makeRoutes from "../routes/routes";
import { UsersEntity } from '../../infra/data/database/entity/UsersEntity';

const route = "postItItems";
const repository = AppDataSource.getRepository(PostItItemsEntity);
const newEntity = new PostItItemsEntity();
const userRepository = AppDataSource.getRepository(UsersEntity);

export default async function makePostItItemsController(app: any, uid: string) {
  let user = await userRepository.findOneBy({ uid: uid })

  let postItItemInfo = {
    route,
    repository,
    newEntity,
    user
  }

  makeRoutes(app, postItItemInfo);
}