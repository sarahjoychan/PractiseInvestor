const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../generateToken');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.createUser = async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  if (!userName || !password || !confirmPassword) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).send({ message: 'Username taken, chose another one.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ userName, password: hashedPassword });
    res.status(201).send({
      userName: newUser.userName,
      token: generateToken(userName),
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.getUser = async (req, res) => {
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

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await User.findOne({ userName });
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
