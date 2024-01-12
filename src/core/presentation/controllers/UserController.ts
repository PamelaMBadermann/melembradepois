import AppDataSource from "../../../data-source";
import { UsersEntity } from "../../infra/data/database/entity/UsersEntity"
import makeRoutes from "../routes/routes";

const route = "users";
const repository = AppDataSource.getRepository(UsersEntity);
const newEntity = new UsersEntity();

export default async function makeUserController(app: any) {
  let userInfo = {
    route,
    repository,
    newEntity
  }

  await makeRoutes(app, userInfo);
}