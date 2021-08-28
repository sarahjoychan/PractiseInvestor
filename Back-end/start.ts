import * as dotenv from 'dotenv';
dotenv.config();
import { server } from './index';

const PORT = process.env.PORT || 6000;

server(PORT);
