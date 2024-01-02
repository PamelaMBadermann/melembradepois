import express from 'express'
import cors from 'cors';

export const app = express();

app.listen(5500, () => console.log('Rodando na porta 5500'))

app.use(cors())

app.use(express.json());