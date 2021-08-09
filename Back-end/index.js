require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { CronJob } = require('cron');
const router = require('./routes/router');
const ranking = require('./controllers/ranking');

const app = express();

const PORT = process.env.PORT || 6000;

app.use(cors());// allows server to interact with the client side
app.use(express.json());// parses(analyzing) incoming requests with JSON
app.use(express.urlencoded({ extended: true }));

app.use(router);

const job = new CronJob({
  cronTime: '5 16 * * 1-5',
  onTick: ranking.storeRanking(),
  start: false,
  timeZone: 'America/New_York',
});
job.start();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
