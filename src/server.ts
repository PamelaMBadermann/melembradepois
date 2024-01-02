
import Connection from './core/infra/data/connections/database';
import { app } from "./core/presentation/App";
import { makeController } from './core/presentation/controllers/UserController';

Connection();
makeController(app);