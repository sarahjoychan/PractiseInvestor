/* eslint-disable no-console */
import * as dotenv from 'dotenv';
dotenv.config();
const Mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/practiseInvestor';

Mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log('Connected to DB!'),
  (err: Error) => console.log(`Could not connect to DB: ${err}`),
);
// to remove deprecated log for findoneandupdate
Mongoose.set('useFindAndModify', false);

export default Mongoose;
