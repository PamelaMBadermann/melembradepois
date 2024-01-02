import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';

import { UserEntity } from "./core/infra/data/database/entity/UserEntity";
import { PostItItemEntity } from "./core/infra/data/database/entity/PostItItemEntity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [UserEntity, PostItItemEntity],
  migrations: [],
  subscribers: [],
});