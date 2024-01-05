import { UsersEntity } from "../../infra/data/database/entity/UsersEntity"
import makeUserRoutes from '../routes/userRoutes';

const route = "users";

export default function makeUserController(app: any) {
  makeUserRoutes(app)
}