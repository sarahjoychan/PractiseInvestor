/* eslint-disable */
import axios from 'axios';
import dotenv from 'dotenv';
import localForage from 'localforage';
import { setupCache } from 'axios-cache-adapter';
dotenv.config();

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
  store: localForage,
  exclude: {
    query: false
  }
})

const axiosInstance = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  adapter: cache.adapter
})

const baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
const apiKey = 'P3ALPJ1AEVHPEXFF';



export const getDataForCompanyWithSymbol = (ticker) => {
  return axiosInstance.get(baseURL + `function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`);
};
