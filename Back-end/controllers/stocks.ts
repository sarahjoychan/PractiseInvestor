import Stock from '../models/stockModel';
import { Request, Response } from 'express';
import request from 'request';

export const getAllStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find();
    res.status(200);
    res.send(stocks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const getMatchingStocks = async (req: Request, res: Response) => {
  try {
    const { filter } = req.params;
    const regex = new RegExp([filter].join(''), 'i');
    const filteredStocks = await Stock.find({ name: { $regex: regex } });
    const firstFiveStocks = filteredStocks.slice(0, 5);
    res.status(200).send(firstFiveStocks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
