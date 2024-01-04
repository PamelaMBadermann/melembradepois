import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';

import { UsersEntity } from "./core/infra/data/database/entity/UsersEntity";
import { PostItItemsEntity } from "./core/infra/data/database/entity/PostItItemsEntity";
import { CreateUsers1704231273469 } from "./core/infra/data/database/migration/1704231273469-CreateUser";
import { CreatePostItItems1704233490943 } from "./core/infra/data/database/migration/1704233490943-CreatePostItItem";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [UsersEntity, PostItItemsEntity],
  migrations: [CreateUsers1704231273469, CreatePostItItems1704233490943],
  subscribers: [],
  migrationsTableName: "migration",
});

export default AppDataSource;