import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import listRouter from './routes/list'

const PORT = process.env.PORT || 3000;

const app = express();

app.use(json());

app.use('/list', listRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  })
})

function start() {
  try {
    app.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server start error: ", error);
  }
}

start();