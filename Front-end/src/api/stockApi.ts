/* eslint-disable */
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.REACT_APP_API_STOCKPRICE_URL;
const apiKey = process.env.REACT_APP_API_STOCKPRICE_KEY;

// get a current price of a stock
export const getCurrentPrice = (ticker) => {
  return axios.get(baseURL + `/price?symbol=${ticker}&apikey=${apiKey}`);
};
