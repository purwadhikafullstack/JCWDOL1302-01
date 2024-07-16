import express, { Application } from 'express';
import { API_PORT } from './config';
import { ErrorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import path = require('path');
import { scheduleTask } from './cron/ScheduleTask';

const PORT: number = Number(API_PORT) || 8000;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
require('./routes')(app);
app.use(ErrorMiddleware);

// scheduleTask();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
