import { UserEntity } from "../../../entity/UserEntity";
import { UserModel } from "../../domain/models";

export class UserRepository {
  public async create(params: UserModel): Promise<UserModel> {
    const { username, password } = params;

    const user = await UserEntity.create({
      username,
      password
    }).save();

    return Object.assign({}, params, user);
  }

  public async getAll(): Promise<UserModel[]> {
    const users = await UserEntity.find();

    return users.map(user => ({
      uid: user.uid,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  public async getOne(uid: string): Promise<UserModel | null> {
    const user = await UserEntity.findOneBy({ uid: uid });

    if (!user) {
      return null
    }

    return {
      uid: user.uid,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public async delete(uid: string): Promise<void> {
    const user = await UserEntity.findOneBy({ uid: uid });

    if (user) {
      user.remove();
    }
  }
}