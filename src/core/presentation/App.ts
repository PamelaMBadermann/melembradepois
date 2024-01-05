import express from 'express'
import cors from 'cors';

export function startApp() {
  const app = express();

  app.use(cors())

  app.use(express.json());

  app.listen(5500, () => console.log('Rodando na porta 5500'))

  return app;
}