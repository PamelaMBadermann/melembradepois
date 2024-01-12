import AppDataSource from "../../../data-source";
import { UsersEntity } from "../../infra/data/database/entity/UsersEntity"
import makeRoutes from "../routes/routes";

const route = "users";
const repository = AppDataSource.getRepository(UsersEntity);
const newUser = new UsersEntity();

export default function makeUserController(app: any) {
  let userInfo = {
    route,
    repository,
    newUser
  }

  makeRoutes(app, userInfo);
}