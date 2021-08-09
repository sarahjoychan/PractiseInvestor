import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.REACT_APP_API_URL;

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => { // attach token to all headers in all request
  const home: any = localStorage.getItem('home');
  if (localStorage.getItem('home')) {
    req.headers['x-auth-token'] = `${JSON.parse(home).token}`;
  }
  return req;
});

// need the token in the req.header********
export const getUser = () => API.get('/user');

// need the token in the req.header*********
export const putHoldings = (newOrder) => API.put('/user/updateHolding', newOrder);


export const signIn = (form) => API.post('/user/login', form);
export const signUp = (form) => API.post('/users', form);

export const getMatchingStocks = (filter) => API.get(`/stocks/${filter}`);

export const getAllStocks = () => API.get('/stocks');

export const getAllUsers = () => API.get('/users');

export const getRanking = () => API.get('/users/ranking');
