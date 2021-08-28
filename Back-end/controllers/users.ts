const bcrypt = require('bcrypt');
import User from '../models/userModel';
import { generateToken } from '../generateToken';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { userName, password, confirmPassword } = req.body;
  if (!userName || !password || !confirmPassword) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).send({ message: 'Username taken, choose another one.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser: any = await User.create({ userName, password: hashedPassword });
    res.status(201).send({
      userName: newUser.userName,
      token: generateToken(userName),
    });
  } catch (error) {
    console.log(`Could not create user: ${error}`)
    res.status(500);
    res.send(error);
  }
};

export const getUser = async (req: any, res: Response) => {
  try {
    const { userName } = req.user;
    const user = await User.findOne({ userName }).select('-password');
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  if (!userName || !password) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user: any = await User.findOne({ userName });
    if (!user) return res.status(404).send({ message: 'Cannot find user.' });
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send(
        {
          userName,
          token: generateToken(userName),
        },
      );
    } else {
      res.status(400).send({ message: 'Wrong password' });
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const totalValueHistory = async (_id: string, totalValue: number, date: Date | string)=> {
  User.updateOne({ _id }, { $push: { totalValueHistory: { totalValue, date } } })
    .then((success: any) => console.log(success))
    .catch((err: Error) => console.log(err));
};
