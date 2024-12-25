const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config')
const bcrypt = require('bcrypt');
import {Request, Response} from 'express';

const generateToken = (id: Number) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '1h' });
};

exports.login = async (req: Request, res: Response) => {
  const { login, password } = req.body;
    if (!login || !password) {
      res.status(400).json({ error: "Login and password are required" });
      return;
    }
  console.log(req.session)
  const user = await User.findOne({ login });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (user && password == user.password) {
    console.log({
      _id: user._id,
      login: user.login,
    });
    if(req.session)
      req.session.user={
        id: user._id,
        login: user.login,
        password: user.password
      }
      res.json({"ok": true})
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
};

exports.logout = async (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if (err) {
      return res.status(500).json({"ok":true})
    }
    res.clearCookie('connect.sid') 
    res.status(200).json({"ok": true})
  });
}


exports.register = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const userExists = await User.findOne({ login });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ login, password });

  if (user) {
    res.status(201).json({"ok":true});
    console.log({
      _id: user._id,
      login: user.login,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};
