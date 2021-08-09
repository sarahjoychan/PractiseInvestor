import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.REACT_APP_NEWS_API_URL;
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

export const topNews = () => {
  return axios.get(baseURL + `${apiKey}`);
};
