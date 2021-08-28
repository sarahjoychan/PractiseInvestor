const cors = require('cors');
const express = require('express');
import { CronJob } from 'cron';
import router from './routes/router';
import { storeRanking } from './controllers/ranking';

export const server = (PORT: number | string) => {
  const app = express();
  app.use(cors());// allows server to interact with the client side
  app.use(express.json());// parses(analyzing) incoming requests with JSON
  app.use(express.urlencoded({ extended: true }));
  
  app.use(router);

  const job = new CronJob({
    cronTime: '0 5 16 * * 1-5',
    onTick: storeRanking,
    start: false,
    timeZone: 'America/New_York',
  });
  job.start();

  const serverListen = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${PORT}`);
  });

  return serverListen;
}