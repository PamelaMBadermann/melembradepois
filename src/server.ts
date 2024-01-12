
import databaseConnection from './core/infra/data/connections/database';
import { startApp } from './core/presentation/App';
import makeUsersController from './core/presentation/controllers/UserController';

const app = startApp();

databaseConnection();
makeUsersController(app);